"use client";

import { motion } from "framer-motion";
import {
  User,
  Users,
  ClipboardCheck,
  Briefcase,
  FileText,
  Calendar,
  ShieldCheck,
  Bird,
  PawPrint,
  Leaf,
  TreePine,
  Trees,
  Search,
  Bell,
  Settings,
  PieChart,
  TrendingUp,
  Heart,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const iconTypes = [
  User,
  Users,
  ClipboardCheck,
  Briefcase,
  FileText,
  Calendar,
  ShieldCheck,
  Bird,
  PawPrint,
  Leaf,
  TreePine,
  Trees,
  Search,
  Bell,
  Settings,
  PieChart,
  TrendingUp,
  Heart,
];

// Macaw Palette
const macawColors = [
  { name: "Red", hex: "#ef4444", shadow: "rgba(239, 68, 68, 0.5)" },
  { name: "Yellow", hex: "#facc15", shadow: "rgba(250, 204, 21, 0.5)" },
  { name: "Blue", hex: "#3b82f6", shadow: "rgba(59, 130, 246, 0.5)" },
  { name: "Green", hex: "#22c55e", shadow: "rgba(34, 197, 94, 0.5)" },
];

interface IconInstance {
  id: number;
  Icon: React.ElementType;
  x: number;
  y: number;
  duration: number;
  pulseDuration: number;
  delay: number;
  baseSize: number;
  rotate: number;
  scale: number;
  color: { hex: string; shadow: string };
}

export function BackgroundIcons() {
  const [state, setState] = useState<{
    mounted: boolean;
    instances: IconInstance[];
  }>({
    mounted: false,
    instances: [],
  });

  useEffect(() => {
    const instances = [...Array(40)].map((_, i) => ({
      id: i,
      Icon: iconTypes[Math.floor(Math.random() * iconTypes.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 50 + Math.random() * 30,
      pulseDuration: 8 + Math.random() * 8,
      delay: -Math.random() * 80,
      baseSize: 22 + Math.random() * 28,
      rotate: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
      color: macawColors[Math.floor(Math.random() * macawColors.length)],
    }));

    requestAnimationFrame(() => {
      setState({ mounted: true, instances });
    });
  }, []);

  if (!state.mounted || state.instances.length === 0) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-50 dark:opacity-30 transition-opacity duration-1000 bg-neutral-50 dark:bg-black">
      {state.instances.map((instance) => (
        <motion.div
          key={instance.id}
          initial={{
            x: `${instance.x}vw`,
            y: `${instance.y}vh`,
            opacity: 0,
            rotate: instance.rotate,
            scale: instance.scale,
          }}
          animate={{
            y: [`${instance.y}vh`, `${instance.y - 12}vh`, `${instance.y}vh`],
            x: [`${instance.x}vw`, `${instance.x + 6}vw`, `${instance.x}vw`],
            rotate: [
              instance.rotate,
              instance.rotate + 15,
              instance.rotate - 15,
              instance.rotate,
            ],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{
            duration: instance.duration,
            repeat: Infinity,
            delay: instance.delay,
            ease: "easeInOut",
          }}
          className="absolute"
        >
          <motion.div
            animate={{
              filter: [
                `drop-shadow(0 0 0px transparent)`,
                `drop-shadow(0 0 15px ${instance.color.shadow})`,
                `drop-shadow(0 0 0px transparent)`,
              ],
            }}
            transition={{
              duration: instance.pulseDuration,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex items-center justify-center dark:brightness-150"
          >
            <instance.Icon
              size={instance.baseSize}
              style={{ color: instance.color.hex }}
              className="opacity-80 dark:opacity-100"
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-neutral-50/60 dark:to-black/60" />
    </div>
  );
}
