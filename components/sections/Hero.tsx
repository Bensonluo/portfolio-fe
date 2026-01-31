'use client';

import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resume, getFeaturedProjects } from '@/data';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
            {resume.name}
          </h1>
          <p className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-xl text-transparent sm:text-2xl font-semibold">
            {resume.title}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {resume.location}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:mt-8">
            {resume.bio}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Link href="/projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-purple-200 text-purple-700 hover:bg-purple-50">
              <Link href="/resume-luopeng-cv.txt" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          <div className="rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-blue-50 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{resume.stats.yearsExperience}</div>
            <div className="mt-2 text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{resume.stats.projectsCompleted}</div>
            <div className="mt-2 text-sm text-muted-foreground">Projects Completed</div>
          </div>
          <div className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{getFeaturedProjects().length}</div>
            <div className="mt-2 text-sm text-muted-foreground">Featured Projects</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
