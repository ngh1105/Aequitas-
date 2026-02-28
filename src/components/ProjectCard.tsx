'use client';

import { GithubLogo, CurrencyEth, Lightning, User, Hash } from '@phosphor-icons/react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { Project } from '@/lib/genlayer';

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const repoName = project.github_url.replace('https://github.com/', '');
    const scoreColor =
        project.impact_score >= 70
            ? 'text-success'
            : project.impact_score >= 50
                ? 'text-primary'
                : 'text-danger';

    return (
        <div className="glass-card p-5 hover:border-border-hover transition-all group cursor-pointer">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: Project Info */}
                <div className="space-y-2 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <Hash size={14} weight="bold" className="text-text-muted shrink-0" />
                        <span className="text-[11px] font-mono text-text-muted">{project.project_id}</span>
                        <StatusBadge status={project.status} />
                    </div>
                    <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 group/link"
                    >
                        <GithubLogo size={18} weight="light" className="text-text-secondary shrink-0" />
                        <span className="font-heading font-semibold text-base text-text-primary group-hover/link:text-primary transition-colors truncate">
                            {repoName}
                        </span>
                    </a>
                    <div className="flex items-center gap-1.5 text-[11px] text-text-muted font-mono truncate">
                        <User size={12} weight="bold" />
                        {project.applicant.slice(0, 8)}...{project.applicant.slice(-6)}
                    </div>
                </div>

                {/* Right: Metrics */}
                <div className="flex items-center gap-6 md:gap-8 shrink-0">
                    {/* Impact Score */}
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-text-muted font-semibold">Impact</p>
                        <p className={`text-3xl font-black font-heading ${scoreColor}`}>
                            {project.impact_score}
                        </p>
                    </div>

                    {/* Approved Amount */}
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-text-muted font-semibold">Grant</p>
                        <p className="text-lg font-bold font-heading flex items-center gap-1">
                            <CurrencyEth size={14} weight="bold" className="text-text-muted" />
                            {Number(project.approved_funds).toLocaleString()}
                        </p>
                    </div>

                    {/* Requested Amount */}
                    <div className="text-center">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-text-muted font-semibold">Asked</p>
                        <p className="text-sm text-text-secondary font-mono flex items-center gap-1">
                            <Lightning size={12} weight="bold" className="text-text-muted" />
                            {Number(project.requested_funds).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
