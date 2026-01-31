'use client';

import { resume } from '@/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="education" className="scroll-mt-16 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="mb-8 text-3xl font-bold">
            Education
          </motion.h2>

          <div className="space-y-4">
            {resume.education.map((edu) => (
              <motion.div key={edu.id} variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <CardTitle>{edu.degree}</CardTitle>
                      <span className="text-sm text-muted-foreground">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <CardDescription>{edu.institution}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {edu.gpa && (
                      <p className="mb-4 text-sm text-muted-foreground">
                        <strong>GPA:</strong> {edu.gpa}
                      </p>
                    )}
                    {edu.coursework && (
                      <div>
                        <p className="mb-2 text-sm font-semibold">Relevant Coursework</p>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course) => (
                            <Badge key={course} variant="secondary">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
