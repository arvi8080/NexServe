import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default Leaflet icon paths
const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const vendorIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface LeafletMapProps {
  customerLat?: number;
  customerLng?: number;
  vendorLat?: number;
  vendorLng?: number;
  height?: string;
  zoom?: number;
  markers?: Array<{ id: string; lat: number; lng: number; title: string }>;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  customerLat = 12.9352,
  customerLng = 77.6245,
  vendorLat = 12.942,
  vendorLng = 77.632,
  height = '320px',
  zoom = 13,
  markers,
}) => {
  const center: [number, number] = [customerLat, customerLng];

  return (
    <div style={{ height }} className="w-full rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative z-0">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers
          ? markers.map((m) => (
              <Marker key={m.id} position={[m.lat, m.lng]} icon={vendorIcon}>
                <Popup>{m.title}</Popup>
              </Marker>
            ))
          : (
              <>
                <Marker position={[customerLat, customerLng]} icon={customIcon}>
                  <Popup>Customer Location</Popup>
                </Marker>
                <Marker position={[vendorLat, vendorLng]} icon={vendorIcon}>
                  <Popup>Beautician Live Location</Popup>
                </Marker>
                <Polyline
                  positions={[
                    [customerLat, customerLng],
                    [vendorLat, vendorLng],
                  ]}
                  color="#f43f5e"
                  weight={4}
                  dashArray="8, 8"
                />
              </>
            )}
      </MapContainer>
    </div>
  );
};
