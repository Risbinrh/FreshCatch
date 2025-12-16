'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin, Edit2, Trash2, Eye } from 'lucide-react';
import { ZONE_CONFIG } from '@/constants';

export default function AdminZonesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Delivery Zones</h1>
          <p className="text-muted-foreground">Configure delivery areas and charges</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Zone
        </Button>
      </div>

      {/* Map Placeholder */}
      <Card>
        <CardContent className="p-0">
          <div className="h-64 bg-gradient-to-br from-sky-100 to-cyan-100 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto text-primary mb-2" />
              <p className="font-medium">Interactive Zone Map</p>
              <p className="text-sm text-muted-foreground">
                Google Maps integration will show delivery zones
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zones Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ZONE_CONFIG.map((zone) => (
          <Card key={zone.type}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge
                  className={
                    zone.type === 'A'
                      ? 'bg-green-500'
                      : zone.type === 'B'
                      ? 'bg-blue-500'
                      : zone.type === 'C'
                      ? 'bg-yellow-500'
                      : 'bg-orange-500'
                  }
                >
                  Zone {zone.type}
                </Badge>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg">{zone.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Radius</span>
                <span className="font-medium">{zone.radius_km} km</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Charge</span>
                <span className="font-medium">
                  {zone.delivery_charge === 0 ? 'FREE' : `₹${zone.delivery_charge}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Min Order</span>
                <span className="font-medium">₹{zone.min_order}</span>
              </div>
              <Badge variant="secondary" className="w-full justify-center">
                Active
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
