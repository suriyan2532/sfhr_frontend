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

interface IconInstance {
  id: number;
  Icon: any;
  x: number;
  y: number;
  duration: number;
  delay: number;
  baseSize: number;
  rotate: number;
  scale: number;
}

export function BackgroundIcons() {
  const [iconInstances, setIconInstances] = useState<IconInstance[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const instances = [...Array(40)].map((_, i) => ({
      id: i,
      Icon: iconTypes[Math.floor(Math.random() * iconTypes.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 25 + Math.random() * 25,
      delay: -Math.random() * 50,
      baseSize: 20 + Math.random() * 30,
      rotate: Math.random() * 360,
      scale: 0.8 + Math.random() * 0.4,
    }));
    setIconInstances(instances);
  }, []);

  if (!mounted || iconInstances.length === 0) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-10 transition-opacity duration-1000 bg-neutral-50 dark:bg-black">
      {iconInstances.map((instance) => (
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
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: instance.duration,
            repeat: Infinity,
            delay: instance.delay,
            ease: "easeInOut",
          }}
          className="absolute"
        >
          <instance.Icon
            size={instance.baseSize}
            className="text-amber-900/40 dark:text-amber-200/40"
          />
        </motion.div>
      ))}

      {/* Soft gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-neutral-50/50 dark:to-black/50" />
    </div>
  );
}
