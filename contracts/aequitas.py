# { "Depends": "py-genlayer:test" }

from genlayer import *
import json


class Aequitas(gl.Contract):
    """
    Aequitas — Autonomous AI-driven Retroactive Public Goods Funding (RetroPGF)

    This contract allows for the evaluation of public goods projects (GitHub repositories)
    using AI consensus. It scores projects based on a community constitution and 
    calculates funding rewards deterministically.
    """

    owner: Address
    treasury_balance: u256
    funding_constitution: str
    project_count: u256
    projects: TreeMap[str, str]

    def __init__(self, constitution: str, initial_treasury: u256):
        self.owner = gl.message.sender_address
        self.funding_constitution = constitution
        self.treasury_balance = initial_treasury
        self.project_count = u256(0)

    @gl.public.write
    def evaluate_project(self, github_url: str, requested_funds: u256) -> None:
        project_id = "proj_" + str(self.project_count)
        self.project_count = self.project_count + u256(1)
        applicant = gl.message.sender_address.as_hex

        constitution_text = self.funding_constitution
        funds_str = str(requested_funds)

        # Prepare input for the AI evaluation
        input_text = f"GitHub repository: {github_url}\nRequested funding: {funds_str} tokens"

        task = f"""You are evaluating a GitHub repository for a public goods funding program.

FUNDING CONSTITUTION:
{constitution_text}

Based on your knowledge of the GitHub repository provided in the input,
return ONLY a single integer from 0 to 100 representing the project impact score.
Only return the number, nothing else."""

        criteria = "The response is a number representing an impact score."

        score_raw = gl.eq_principle.prompt_non_comparative(
            lambda: input_text,
            task=task,
            criteria=criteria,
        )

        # Deterministic calculations
        try:
            score = int(score_raw.strip())
            score = max(0, min(100, score))
            is_approved = score >= 50
            if is_approved:
                approved_funds = (requested_funds * u256(score)) // u256(100)
            else:
                approved_funds = u256(0)
            status = "APPROVED" if is_approved else "REJECTED"
        except Exception:
            score = 0
            approved_funds = u256(0)
            status = "PARSE_ERROR"

        self.projects[project_id] = json.dumps({
            "project_id": project_id,
            "applicant": applicant,
            "github_url": github_url,
            "requested_funds": funds_str,
            "approved_funds": str(approved_funds),
            "impact_score": score,
            "status": status,
        })

    @gl.public.write
    def update_constitution(self, new_constitution: str) -> None:
        if gl.message.sender_address != self.owner:
            raise Exception("Only the owner can update the constitution")
        self.funding_constitution = new_constitution

    @gl.public.write
    def deposit_funds(self, amount: u256) -> None:
        if amount <= u256(0):
            raise Exception("Amount must be positive")
        self.treasury_balance = self.treasury_balance + amount

    # ---- View Methods ----

    @gl.public.view
    def get_constitution(self) -> str:
        return self.funding_constitution

    @gl.public.view
    def get_treasury(self) -> str:
        return str(self.treasury_balance)

    @gl.public.view
    def get_project(self, project_id: str) -> str:
        result = self.projects.get(project_id, None)
        if result is None:
            raise Exception("Project not found")
        return result

    @gl.public.view
    def get_project_count(self) -> str:
        return str(self.project_count)

    @gl.public.view
    def get_all_projects(self) -> str:
        all_projects = []
        for pid, pdata in self.projects.items():
            all_projects.append(pdata)
        return json.dumps(all_projects)

    @gl.public.view
    def get_owner(self) -> str:
        return self.owner.as_hex
