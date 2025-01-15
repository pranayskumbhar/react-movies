import { useFormikContext } from "formik";
import coordinateDTO from "../utils/coordinates.model";
import Map from "../utils/Map";

export default function MapField(props: mapFieldProps) {
  const { values } = useFormikContext<any>();


  function handleMapClick(coordinates: coordinateDTO) {
    //alert(34234234234234)
     values[props.latfield] = coordinates.lat;
    values[props.latfield] = coordinates.lng;
    console.log(values);
  }
 



  return (
    <>
     <Map coordinates={props.coordinates} handleMapClick={handleMapClick} />
    </>
  );
}

interface mapFieldProps {
  coordinates: coordinateDTO[];
  latfield: string;
  lngfield: string;
}

MapField.defaultProps = {
  coordinated: [],
};
