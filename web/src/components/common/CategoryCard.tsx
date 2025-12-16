import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  id: string;
  name: string;
  nameTa?: string;
  icon: string;
  itemCount?: number;
  language?: 'en' | 'ta';
  className?: string;
}

export function CategoryCard({
  id,
  name,
  nameTa,
  icon,
  itemCount,
  language = 'en',
  className,
}: CategoryCardProps) {
  const displayName = language === 'en' ? name : (nameTa || name);

  return (
    <Link href={`/catalog?category=${id}`}>
      <Card className={cn(
        'group cursor-pointer hover:shadow-md hover:border-primary/50 transition-all',
        className
      )}>
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">
            {icon}
          </span>
          <h3 className="font-medium text-sm">{displayName}</h3>
          {typeof itemCount === 'number' && (
            <p className="text-xs text-muted-foreground mt-1">
              {itemCount} {language === 'en' ? 'items' : 'பொருட்கள்'}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
