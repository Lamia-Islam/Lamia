import React from "react";

export function NDPAIDiagram() {
  return (
    <div className="w-full rounded-xl border border-border bg-neutral-50 dark:bg-neutral-900/60 p-4 sm:p-6 overflow-x-auto">
      <svg
        viewBox="0 0 840 280"
        className="w-full min-w-[700px] h-auto text-foreground select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background grid accents */}
        <defs>
          <pattern id="grid-ndpai" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.04" strokeWidth="1" />
          </pattern>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor" fillOpacity="0.7" />
          </marker>
        </defs>
        <rect width="840" height="280" fill="url(#grid-ndpai)" rx="8" />

        {/* Stage 1: Biosignal Sensing */}
        <g transform="translate(20, 40)">
          <rect width="180" height="190" rx="10" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
          <text x="90" y="30" textAnchor="middle" className="font-serif font-bold text-xs" fill="currentColor">
            Wearable Biosignals
          </text>
          <text x="90" y="48" textAnchor="middle" className="font-sans text-[10px]" fill="currentColor" fillOpacity="0.6">
            Multi-Modal Real-Time
          </text>

          {/* Biosignal lines */}
          <rect x="20" y="70" width="140" height="40" rx="6" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.15" />
          <text x="30" y="93" className="font-sans font-semibold text-[11px]" fill="currentColor">ECG &bull; HRV Features</text>
          <path d="M 115 90 Q 120 78, 125 90 T 135 90 T 145 78 T 150 90" stroke="currentColor" strokeWidth="1.5" fill="none" strokeOpacity="0.7" />

          <rect x="20" y="125" width="140" height="40" rx="6" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.15" />
          <text x="30" y="148" className="font-sans font-semibold text-[11px]" fill="currentColor">EDA Decomposition</text>
          <path d="M 115 150 Q 130 135, 150 145" stroke="currentColor" strokeWidth="1.5" fill="none" strokeOpacity="0.7" />

          <text x="90" y="180" textAnchor="middle" className="font-mono text-[9px]" fill="currentColor" fillOpacity="0.5">
            WESAD &amp; MIT DriveDB
          </text>
        </g>

        {/* Arrow 1 -> 2 */}
        <line x1="205" y1="135" x2="245" y2="135" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrow)" strokeOpacity="0.7" />

        {/* Stage 2: Probabilistic Classifier & Marginal Evidence */}
        <g transform="translate(250, 25)">
          <rect width="250" height="220" rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.5" />
          <text x="125" y="28" textAnchor="middle" className="font-serif font-bold text-sm" fill="currentColor">
            Class-Conditional Gaussian Core
          </text>
          <text x="125" y="46" textAnchor="middle" className="font-sans text-[10px]" fill="currentColor" fillOpacity="0.7">
            Inference &amp; Zero-Cost Evidence Monitor
          </text>

          {/* Sub block: Normal prediction */}
          <rect x="20" y="65" width="210" height="60" rx="6" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.2" />
          <text x="30" y="88" className="font-sans font-semibold text-xs" fill="currentColor">Driver Fatigue State</text>
          <text x="30" y="106" className="font-mono text-[10px]" fill="currentColor" fillOpacity="0.6">
            Balanced Acc: 0.841 | F1: 0.711
          </text>

          {/* Sub block: Marginal Log-Likelihood Competence Monitor */}
          <rect x="20" y="135" width="210" height="90" rx="6" fill="#28598A" fillOpacity="0.09" stroke="#28598A" strokeWidth="1.5" />
          <text x="30" y="157" className="font-sans font-bold text-xs" fill="#28598A">
            Competence Gate: ln p(x)
          </text>
          <text x="30" y="174" className="font-sans text-[10px]" fill="currentColor" fillOpacity="0.8">
            Marginal Log-Evidence (Discarded Denominator)
          </text>
          <rect x="30" y="185" width="190" height="24" rx="4" fill="currentColor" fillOpacity="0.07" />
          <text x="125" y="201" textAnchor="middle" className="font-mono font-bold text-[11px]" fill="currentColor">
            AUROC: 0.966 (vs 0.422 baseline)
          </text>
        </g>

        {/* Arrow 2 -> 3 */}
        <line x1="505" y1="135" x2="545" y2="135" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrow)" strokeOpacity="0.7" />

        {/* Stage 3: ROS 2 Graded Intervention Handover */}
        <g transform="translate(550, 40)">
          <rect width="260" height="190" rx="10" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
          <text x="130" y="30" textAnchor="middle" className="font-serif font-bold text-xs" fill="currentColor">
            ROS 2 Robotic Intervention
          </text>
          <text x="130" y="48" textAnchor="middle" className="font-sans text-[10px]" fill="currentColor" fillOpacity="0.6">
            6-Node Live Topic Pipeline
          </text>

          {/* Graded Handover Stages */}
          <g transform="translate(15, 65)">
            <rect width="230" height="30" rx="4" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.1" />
            <circle cx="15" cy="15" r="5" fill="#10b981" />
            <text x="28" y="19" className="font-sans text-[10px]" fill="currentColor">
              High Confidence &rarr; Nominal Driver Control
            </text>
          </g>

          <g transform="translate(15, 102)">
            <rect width="230" height="30" rx="4" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.1" />
            <circle cx="15" cy="15" r="5" fill="#f59e0b" />
            <text x="28" y="19" className="font-sans text-[10px]" fill="currentColor">
              Fatigue Detected &rarr; Graded Haptic Alert
            </text>
          </g>

          <g transform="translate(15, 139)">
            <rect width="230" height="30" rx="4" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.1" />
            <circle cx="15" cy="15" r="5" fill="#ef4444" />
            <text x="28" y="19" className="font-sans text-[10px]" fill="currentColor">
              OOD / Incompetence &rarr; Safe Robotic Pull-over
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}

export function MultiRobotDiagram() {
  return (
    <div className="w-full rounded-xl border border-border bg-neutral-50 dark:bg-neutral-900/60 p-4 sm:p-6 overflow-x-auto">
      <svg
        viewBox="0 0 840 260"
        className="w-full min-w-[700px] h-auto text-foreground select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-robot" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.04" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="840" height="260" fill="url(#grid-robot)" rx="8" />

        {/* 3 Autonomous Robots */}
        <g transform="translate(30, 35)">
          <rect width="210" height="190" rx="10" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
          <text x="105" y="28" textAnchor="middle" className="font-serif font-bold text-xs" fill="currentColor">
            Tri-Robot Fleet (ROS 2 Humble)
          </text>

          <g transform="translate(20, 48)">
            <circle cx="20" cy="18" r="12" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
            <text x="20" y="22" textAnchor="middle" className="font-mono text-[9px] font-bold" fill="currentColor">R1</text>
            <text x="45" y="22" className="font-sans text-[11px]" fill="currentColor">Diff-Drive Robot 1 (Lidar)</text>
          </g>

          <g transform="translate(20, 93)">
            <circle cx="20" cy="18" r="12" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
            <text x="20" y="22" textAnchor="middle" className="font-mono text-[9px] font-bold" fill="currentColor">R2</text>
            <text x="45" y="22" className="font-sans text-[11px]" fill="currentColor">Diff-Drive Robot 2 (Lidar)</text>
          </g>

          <g transform="translate(20, 138)">
            <circle cx="20" cy="18" r="12" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
            <text x="20" y="22" textAnchor="middle" className="font-mono text-[9px] font-bold" fill="currentColor">R3</text>
            <text x="45" y="22" className="font-sans text-[11px]" fill="currentColor">Diff-Drive Robot 3 (Lidar)</text>
          </g>
        </g>

        {/* Collaborative SLAM & Map Merging */}
        <g transform="translate(270, 35)">
          <rect width="260" height="190" rx="10" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
          <text x="130" y="28" textAnchor="middle" className="font-serif font-bold text-xs" fill="currentColor">
            Collaborative SLAM &amp; Assignment
          </text>

          <rect x="20" y="48" width="220" height="35" rx="5" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.15" />
          <text x="30" y="70" className="font-sans text-[11px] font-medium" fill="currentColor">
            slam_toolbox + Custom Map Merging
          </text>

          <rect x="20" y="93" width="220" height="35" rx="5" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.15" />
          <text x="30" y="115" className="font-sans text-[11px] font-medium" fill="currentColor">
            Wavefront BFS Frontier Detection
          </text>

          <rect x="20" y="138" width="220" height="35" rx="5" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.15" />
          <text x="30" y="160" className="font-sans text-[11px] font-medium" fill="currentColor">
            Hungarian Optimal Frontier Pairing
          </text>
        </g>

        {/* Belief Field & Geodesic Correction */}
        <g transform="translate(560, 35)">
          <rect width="250" height="190" rx="10" fill="#28598A" fillOpacity="0.06" stroke="#28598A" strokeWidth="1.5" />
          <text x="125" y="28" textAnchor="middle" className="font-serif font-bold text-xs" fill="#28598A">
            Victim-Prior Allocation &amp; Correction
          </text>

          <g transform="translate(20, 50)">
            <text x="0" y="14" className="font-sans font-bold text-[11px] text-red-500">
              &times; Euclidean Kernel (Stalled):
            </text>
            <text x="0" y="30" className="font-sans text-[10px]" fill="currentColor" fillOpacity="0.7">
              Placed search probability through walls
            </text>
          </g>

          <g transform="translate(20, 100)">
            <text x="0" y="14" className="font-sans font-bold text-[11px] text-emerald-500">
              &check; Geodesic Correction (Recovered):
            </text>
            <text x="0" y="30" className="font-sans text-[10px]" fill="currentColor" fillOpacity="0.7">
              Restricted probability along walkable paths
            </text>
          </g>

          <div className="border-t border-border/80 pt-2" />
          <rect x="20" y="145" width="210" height="28" rx="4" fill="currentColor" fillOpacity="0.08" />
          <text x="125" y="163" textAnchor="middle" className="font-mono text-[10px] font-semibold" fill="currentColor">
            ICCIT 2026 Submitted
          </text>
        </g>
      </svg>
    </div>
  );
}

export function WoundBenchmarkDiagram() {
  return (
    <div className="w-full rounded-xl border border-border bg-neutral-50 dark:bg-neutral-900/60 p-4 sm:p-6 overflow-x-auto">
      <svg
        viewBox="0 0 840 240"
        className="w-full min-w-[700px] h-auto text-foreground select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-wound" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.04" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="840" height="240" fill="url(#grid-wound)" rx="8" />

        {/* 22 Segmentation Algorithms Pool */}
        <g transform="translate(30, 30)">
          <rect width="210" height="180" rx="10" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
          <text x="105" y="28" textAnchor="middle" className="font-serif font-bold text-xs" fill="currentColor">
            22 Segmentation Methods
          </text>
          <text x="105" y="46" textAnchor="middle" className="font-sans text-[10px]" fill="currentColor" fillOpacity="0.6">
            Ablation &amp; Ranking Pool
          </text>
          <rect x="20" y="65" width="170" height="30" rx="4" fill="currentColor" fillOpacity="0.05" />
          <text x="30" y="84" className="font-sans text-[10px]" fill="currentColor">Color Space Thresholding</text>
          <rect x="20" y="105" width="170" height="30" rx="4" fill="currentColor" fillOpacity="0.05" />
          <text x="30" y="124" className="font-sans text-[10px]" fill="currentColor">Morphological Active Contours</text>
          <rect x="20" y="145" width="170" height="30" rx="4" fill="currentColor" fillOpacity="0.05" />
          <text x="30" y="164" className="font-sans text-[10px]" fill="currentColor">Lightweight U-Net Variants</text>
        </g>

        {/* Synthetic vs Clinical Benchmark Divergence */}
        <g transform="translate(270, 30)">
          <rect width="300" height="180" rx="10" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
          <text x="150" y="28" textAnchor="middle" className="font-serif font-bold text-xs" fill="currentColor">
            Spearman Rank Correlation Analysis
          </text>

          <g transform="translate(20, 50)">
            <rect width="260" height="50" rx="6" fill="#ef4444" fillOpacity="0.08" stroke="#ef4444" strokeOpacity="0.3" strokeWidth="1.2" />
            <text x="15" y="22" className="font-sans font-bold text-xs text-red-500">
              Synthetic Benchmark A vs B:
            </text>
            <text x="15" y="40" className="font-mono text-xs font-bold" fill="currentColor">
              &rho; = -0.526 (p = 0.014) &bull; INVERTED
            </text>
          </g>

          <g transform="translate(20, 112)">
            <rect width="260" height="50" rx="6" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeOpacity="0.3" strokeWidth="1.2" />
            <text x="15" y="22" className="font-sans font-bold text-xs text-emerald-500">
              Clinical Dataset 1 vs 2:
            </text>
            <text x="15" y="40" className="font-mono text-xs font-bold" fill="currentColor">
              &rho; = +0.560 (p = 0.008) &bull; CONSISTENT
            </text>
          </g>
        </g>

        {/* Decisive Root Cause */}
        <g transform="translate(600, 30)">
          <rect width="210" height="180" rx="10" fill="#28598A" fillOpacity="0.06" stroke="#28598A" strokeWidth="1.5" />
          <text x="105" y="28" textAnchor="middle" className="font-serif font-bold text-xs" fill="#28598A">
            Ablation Conclusion
          </text>
          <text x="105" y="60" textAnchor="middle" className="font-serif text-sm font-bold text-foreground">
            Background Texture
          </text>
          <p className="text-xs text-center p-3 text-muted-foreground">
            Ablation proved background texture fidelity is the single property determining clinical predictability.
          </p>
          <div className="px-4 py-2 mt-4 text-center">
            <span className="text-[10px] font-mono px-2 py-1 rounded bg-neutral-200/50 dark:bg-neutral-800 text-muted-foreground">
              Springer JMII Prep
            </span>
          </div>
        </g>
      </svg>
    </div>
  );
}

export function RoboticArmDiagram() {
  return (
    <div className="w-full rounded-xl border border-border bg-neutral-50 dark:bg-neutral-900/60 p-4 sm:p-6 overflow-x-auto">
      <svg
        viewBox="0 0 840 220"
        className="w-full min-w-[700px] h-auto text-foreground select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid-arm" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.04" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="840" height="220" fill="url(#grid-arm)" rx="8" />

        {/* 6-DOF Kinematic Chain */}
        <g transform="translate(30, 30)">
          <rect width="240" height="160" rx="10" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
          <text x="120" y="28" textAnchor="middle" className="font-serif font-bold text-xs" fill="currentColor">
            6-DOF URDF Kinematics Chain
          </text>
          <text x="120" y="46" textAnchor="middle" className="font-sans text-[10px]" fill="currentColor" fillOpacity="0.6">
            Geometric link descriptions &amp; limits
          </text>
          <text x="25" y="80" className="font-mono text-xs" fill="currentColor">Base &rarr; Joint 1 (Revolute)</text>
          <text x="25" y="105" className="font-mono text-xs" fill="currentColor">Joint 2 &rarr; Joint 3 (Shoulder/Elbow)</text>
          <text x="25" y="130" className="font-mono text-xs" fill="currentColor">Joint 4 &rarr; 6 (Wrist / End Effector)</text>
        </g>

        {/* MoveIt 2 Motion Planning */}
        <g transform="translate(300, 30)">
          <rect width="240" height="160" rx="10" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
          <text x="120" y="28" textAnchor="middle" className="font-serif font-bold text-xs" fill="currentColor">
            MoveIt 2 Motion Planning
          </text>
          <text x="120" y="46" textAnchor="middle" className="font-sans text-[10px]" fill="currentColor" fillOpacity="0.6">
            OMPL / Collision Checking
          </text>
          <rect x="20" y="65" width="200" height="30" rx="4" fill="currentColor" fillOpacity="0.05" />
          <text x="30" y="84" className="font-sans text-[11px]" fill="currentColor">Inverse Kinematics (KDL)</text>
          <rect x="20" y="105" width="200" height="30" rx="4" fill="currentColor" fillOpacity="0.05" />
          <text x="30" y="124" className="font-sans text-[11px]" fill="currentColor">Trajectory Smoothing &amp; Limits</text>
        </g>

        {/* RViz Visualizer & WSL2 Acceleration */}
        <g transform="translate(570, 30)">
          <rect width="240" height="160" rx="10" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
          <text x="120" y="28" textAnchor="middle" className="font-serif font-bold text-xs" fill="currentColor">
            RViz &amp; Environment Setup
          </text>
          <text x="120" y="46" textAnchor="middle" className="font-sans text-[10px]" fill="currentColor" fillOpacity="0.6">
            Industrial Training Deliverable
          </text>
          <p className="text-xs p-4 text-muted-foreground leading-relaxed">
            Engineered from scratch in one working session. Solved WSL2 graphics driver forwarding and ROS 2 communication sockets.
          </p>
        </g>
      </svg>
    </div>
  );
}
