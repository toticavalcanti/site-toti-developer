'use client';

import { TimelineItem as TimelineItemType } from '@/types';
import { motion } from 'framer-motion';

interface TimelineProps {
  items: TimelineItemType[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary" />

      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`relative flex items-center ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Content */}
            <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-8 md:pl-0`}>
              <div className="bg-background-secondary border border-border rounded-lg p-6 hover:border-primary transition-colors">
                <div className="text-primary font-bold text-2xl mb-2">
                  {item.year}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-foreground-secondary">{item.description}</p>
              </div>
            </div>

            {/* Dot */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-secondary border-4 border-background" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
