'use client';

import { useAequitas } from '@/hooks/useAequitas';
import { Navbar } from '@/components/Navbar';
import { TreasuryPanel } from '@/components/TreasuryPanel';
import { ConstitutionPanel } from '@/components/ConstitutionPanel';
import { SubmitForm } from '@/components/SubmitForm';
import { DepositPanel } from '@/components/DepositPanel';
import { ProjectCard } from '@/components/ProjectCard';
import { TransactionTracker } from '@/components/TransactionTracker';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { ListChecks, WarningCircle, FunnelSimple } from '@phosphor-icons/react';

export default function Home() {
  const {
    treasury,
    constitution,
    projects,
    loading,
    error,
    evaluateProject,
    depositFunds,
    refresh,
  } = useAequitas();

  const handleEvaluate = async (githubUrl: string, requestedFunds: string): Promise<void> => {
    await evaluateProject(githubUrl, requestedFunds);
  };

  const handleDeposit = async (amount: string): Promise<void> => {
    await depositFunds(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRefresh={refresh} loading={loading} />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Error Banner */}
        {error && (
          <div className="flex items-center gap-3 bg-danger/8 border border-danger/20 text-danger rounded-2xl px-5 py-4 text-sm">
            <WarningCircle size={20} weight="duotone" />
            <span className="flex-1">{error}</span>
            <button onClick={refresh} className="text-xs underline hover:text-white transition-colors cursor-pointer">
              Retry
            </button>
          </div>
        )}

        {/* ======== BENTO GRID: Top Row ======== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Treasury (1 col) */}
          <TreasuryPanel
            balance={treasury}
            loading={loading}
            projectCount={projects.length}
          />

          {/* Constitution (1 col) */}
          <ConstitutionPanel
            constitution={constitution}
            loading={loading}
          />

          {/* Submit Form (1 col) */}
          <SubmitForm
            onSubmit={handleEvaluate}
            disabled={loading}
          />
        </div>

        {/* ======== BENTO GRID: Middle Row ======== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Transaction Tracker (2 cols) */}
          <div className="md:col-span-2">
            <TransactionTracker />
          </div>

          {/* Deposit (1 col) */}
          <DepositPanel
            onDeposit={handleDeposit}
            disabled={loading}
          />
        </div>

        {/* ======== Evaluation Registry ======== */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ListChecks size={22} weight="duotone" className="text-primary" />
              <h2 className="text-xl font-bold font-heading">Evaluation Registry</h2>
              <span className="text-xs font-mono text-text-muted bg-white/5 px-2 py-0.5 rounded-md">
                {projects.length} entries
              </span>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors cursor-pointer">
              <FunnelSimple size={14} weight="bold" />
              Filter
            </button>
          </div>

          {/* Project List */}
          <div className="space-y-3">
            {loading && projects.length === 0 ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : projects.length === 0 ? (
              <div className="glass-card p-12 flex flex-col items-center justify-center text-center border-dashed">
                <ListChecks size={40} weight="thin" className="text-text-muted mb-3" />
                <p className="text-text-muted text-sm">No projects evaluated yet.</p>
                <p className="text-text-muted/60 text-xs mt-1">Submit a GitHub repository above to get started.</p>
              </div>
            ) : (
              projects.slice().reverse().map((project) => (
                <ProjectCard key={project.project_id} project={project} />
              ))
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 text-center text-xs text-text-muted">
        <p>Aequitas RetroPGF — Powered by <span className="text-primary font-semibold">GenLayer</span> AI Consensus</p>
      </footer>
    </div>
  );
}
