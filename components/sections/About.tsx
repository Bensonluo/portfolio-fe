'use client';

import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-8 text-center text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            About Me
          </h2>

          {/* Empty placeholder section for future photos */}
          <Card className="border-dashed">
            <CardContent className="flex min-h-[400px flex-col items-center justify-center p-12 text-center">
              <div className="mb-6 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-950/20 dark:to-blue-950/20 p-8">
                <svg
                  className="h-24 w-24 text-purple-400 dark:text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Personal Gallery</h3>
              <p className="mb-4 text-muted-foreground max-w-md">
                Space reserved for personal photos and lifestyle content.
              </p>
              <p className="text-sm text-muted-foreground">
                Download my resume for detailed work experience, skills, and education background.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
