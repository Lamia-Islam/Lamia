import React from "react";

export function ThesisGateDiagram() {
  return (
    <svg viewBox="0 0 400 260" role="img" aria-labelledby="f1t">
      <title id="f1t">
        Schematic: lab data and real-road data form two separate distributions; a gate on the model&apos;s own likelihood score lets familiar data through and routes unfamiliar data to a human-overridable intervention.
      </title>
      <g fill="none" stroke="var(--ink)" strokeWidth="2">
        <line x1="20" y1="170" x2="380" y2="170" />
        <path d="M30 170 C 70 168, 90 60, 120 60 C 150 60, 170 168, 210 170" />
        <path d="M150 170 C 215 168, 255 95, 290 95 C 325 95, 345 168, 380 170" strokeDasharray="6 5" />
      </g>
      <rect x="196" y="36" width="10" height="134" fill="var(--ink)" />
      <g fontFamily="var(--sans), Instrument Sans, Arial, sans-serif" fontSize="16" fill="var(--ink)">
        <text x="120" y="48" textAnchor="middle">lab</text>
        <text x="290" y="83" textAnchor="middle">real road</text>
        <text x="201" y="26" textAnchor="middle" fontWeight="600">gate</text>
      </g>
      <g fontFamily="var(--sans), Instrument Sans, Arial, sans-serif" fontSize="16" fill="var(--ink-2)">
        <text x="20" y="194">model&apos;s own likelihood score</text>
      </g>
      <g fill="none" stroke="var(--ink)" strokeWidth="2">
        <path d="M120 206 L120 232 L150 232" />
        <path d="M290 206 L290 232 L262 232" />
      </g>
      <path d="M150 226 L162 232 L150 238 Z" fill="var(--ink)" />
      <path d="M262 226 L250 232 L262 238 Z" fill="var(--ink)" />
      <g fontFamily="var(--sans), Instrument Sans, Arial, sans-serif" fontSize="16" fill="var(--ink)">
        <text x="166" y="237">trust</text>
      </g>
      <rect x="300" y="218" width="96" height="30" fill="var(--ink)" />
      <text x="348" y="238" fontFamily="var(--sans), Instrument Sans, Arial, sans-serif" fontSize="15" fill="var(--paper)" textAnchor="middle" fontWeight="500">
        hand over
      </text>
      <line x1="290" y1="232" x2="300" y2="232" stroke="var(--ink)" strokeWidth="2" />
    </svg>
  );
}

export function MultiRobotBeliefDiagram() {
  return (
    <svg viewBox="0 0 400 260" role="img" aria-labelledby="f2t">
      <title id="f2t">
        Schematic: three robots on one side of a wall. A straight-line belief spreads through the wall; a path-aware belief follows the route around it.
      </title>
      <rect x="10" y="10" width="380" height="240" fill="none" stroke="var(--ink)" strokeWidth="2" />
      <rect x="196" y="10" width="12" height="170" fill="var(--ink)" />
      {/* straight-line spread, through wall */}
      <circle cx="300" cy="90" r="34" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="5 5" />
      <circle cx="300" cy="90" r="62" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="5 5" />
      <clipPath id="room"><rect x="11" y="11" width="378" height="238" /></clipPath>
      <circle cx="300" cy="90" r="96" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="5 5" clipPath="url(#room)" />
      <circle cx="300" cy="90" r="132" fill="none" stroke="var(--ink-3)" strokeWidth="1.5" strokeDasharray="5 5" clipPath="url(#room)" />
      {/* victim */}
      <g stroke="var(--ink)" strokeWidth="2.5">
        <line x1="292" y1="82" x2="308" y2="98" />
        <line x1="308" y1="82" x2="292" y2="98" />
      </g>
      {/* geodesic path around wall */}
      <path d="M300 112 C 300 190, 260 214, 202 214 C 150 214, 110 200, 100 168" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
      <path d="M94 176 L100 162 L108 174 Z" fill="var(--ink)" />
      {/* robots */}
      <g fill="var(--paper)" stroke="var(--ink)" strokeWidth="2">
        <circle cx="70" cy="60" r="12" />
        <circle cx="120" cy="110" r="12" />
        <circle cx="60" cy="150" r="12" />
      </g>
      <g stroke="var(--ink)" strokeWidth="2">
        <line x1="70" y1="60" x2="82" y2="54" />
        <line x1="120" y1="110" x2="132" y2="104" />
        <line x1="60" y1="150" x2="72" y2="146" />
      </g>
      <g fontFamily="var(--sans), Instrument Sans, Arial, sans-serif" fontSize="16" fill="var(--ink)">
        <text x="24" y="36">robots</text>
        <text x="214" y="34">wall</text>
        <text x="296" y="140">victim prior</text>
        <text x="214" y="236">path-aware route</text>
      </g>
    </svg>
  );
}

export function WoundBenchmarkDiagram() {
  return (
    <svg viewBox="0 0 400 260" role="img" aria-labelledby="f3t">
      <title id="f3t">
        Schematic: two synthetic benchmarks rank the same methods in opposite orders, so their lines cross; two clinical datasets rank them in the same order, so their lines run parallel.
      </title>
      <g fontFamily="var(--sans), Instrument Sans, Arial, sans-serif" fontSize="14" fill="var(--ink)" textAnchor="middle">
        <text x="40" y="24">synthetic A</text>
        <text x="160" y="24">synthetic B</text>
        <text x="250" y="24">clinical 1</text>
        <text x="360" y="24">clinical 2</text>
      </g>
      <g stroke="var(--ink)" strokeWidth="2" fill="none">
        <line x1="40" y1="50" x2="160" y2="230" />
        <line x1="40" y1="95" x2="160" y2="185" />
        <line x1="40" y1="140" x2="160" y2="140" />
        <line x1="40" y1="185" x2="160" y2="95" />
        <line x1="40" y1="230" x2="160" y2="50" />
        <line x1="250" y1="50" x2="360" y2="50" />
        <line x1="250" y1="95" x2="360" y2="95" />
        <line x1="250" y1="140" x2="360" y2="140" />
        <line x1="250" y1="185" x2="360" y2="185" />
        <line x1="250" y1="230" x2="360" y2="230" />
      </g>
      <g fill="var(--ink)">
        <circle cx="40" cy="50" r="6" />
        <circle cx="40" cy="95" r="6" />
        <circle cx="40" cy="140" r="6" />
        <circle cx="40" cy="185" r="6" />
        <circle cx="40" cy="230" r="6" />
        <circle cx="160" cy="50" r="6" />
        <circle cx="160" cy="95" r="6" />
        <circle cx="160" cy="140" r="6" />
        <circle cx="160" cy="185" r="6" />
        <circle cx="160" cy="230" r="6" />
        <circle cx="250" cy="50" r="6" />
        <circle cx="250" cy="95" r="6" />
        <circle cx="250" cy="140" r="6" />
        <circle cx="250" cy="185" r="6" />
        <circle cx="250" cy="230" r="6" />
        <circle cx="360" cy="50" r="6" />
        <circle cx="360" cy="95" r="6" />
        <circle cx="360" cy="140" r="6" />
        <circle cx="360" cy="185" r="6" />
        <circle cx="360" cy="230" r="6" />
      </g>
      <line x1="205" y1="40" x2="205" y2="240" stroke="var(--rule)" strokeWidth="1" />
    </svg>
  );
}

// Aliases for compatibility
export const NDPAIDiagram = ThesisGateDiagram;
export const MultiRobotDiagram = MultiRobotBeliefDiagram;
export function RoboticArmDiagram() {
  return null;
}
