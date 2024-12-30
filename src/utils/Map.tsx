import { MapContainer, TileLayer, useMapEvent, Marker } from "react-leaflet";
import L  from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import coordinateDTO from "./coordinates.model";
import { useState } from "react";

let defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [16, 37],
});

L.Marker.prototype.options.icon = defaultIcon;

export default function Map(props: mapProps) {
    const [coordinates, setCoordinates] = useState<coordinateDTO[]>(props.coordinates);
    console.log(4234234234 )
    console.log(coordinates )
  return (
    <>
      <MapContainer
        center={[19.130616, 72.99716]}
        zoom={14}
        style={{ height: props.height }}
      >
        <TileLayer
          attribution="React Movies"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClick
          setCoordinates={(coordinates) => {
            setCoordinates([coordinates]);
            props.handleMapClick(coordinates)
          }}
        />

        {coordinates.map((coordinate, index)=> <Marker key={index} position={[coordinate.lat, coordinate.lng]}/> )}
       </MapContainer>
    </>
  );
}

interface mapProps {
  height: string;
  coordinates : coordinateDTO[]
  handleMapClick(coordinates: coordinateDTO) : void;
}

Map.defaultProps = {
  height: "500px",
};

function MapClick(props: mapCLickProps) {
  useMapEvent("click", function (evenytArgs) {
    props.setCoordinates({
      lat: evenytArgs.latlng.lat,
      lng: evenytArgs.latlng.lng,
    });
  });
  return null;
}

interface mapCLickProps {
  setCoordinates(coordinated: coordinateDTO): void;
}
