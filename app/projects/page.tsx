import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { projects } from '@/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-4xl font-bold">All Projects</h1>
          <p className="mb-12 text-lg text-muted-foreground">
            A collection of my work in machine learning, full-stack development, and more.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.slug} className="h-full transition-shadow hover:shadow-lg">
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
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mb-2 text-sm font-semibold">Tech Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.techStack.length - 4}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/projects/${project.slug}`}>View Details</Link>
                  </Button>
                  {project.githubUrl && (
                    <Button asChild variant="outline" size="icon">
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button asChild variant="outline" size="icon">
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
