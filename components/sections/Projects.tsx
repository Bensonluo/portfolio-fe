'use client';

import Link from 'next/link';
import { getFeaturedProjects } from '@/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const projects = getFeaturedProjects();

  return (
    <section className="bg-gradient-to-b from-purple-50/50 to-transparent dark:from-purple-950/20 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl" ref={ref}>
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent">Featured Projects</h2>
              <p className="mt-2 text-muted-foreground">My latest work in LLM, RAG systems, and ML infrastructure</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <motion.div key={project.slug} variants={itemVariants}>
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {project.title}
                      {project.demoType === 'interactive' && (
                        <Badge variant="secondary" className="text-xs">
                          Live Demo
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                      {project.longDescription}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, 5).map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > 5 && (
                        <Badge variant="outline">+{project.tags.length - 5}</Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/projects/${project.slug}`}>
                        View Details
                      </Link>
                    </Button>
                    {project.githubUrl && (
                      <Button asChild variant="outline" size="icon">
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
