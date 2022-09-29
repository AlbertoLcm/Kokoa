import { usePlacesWidget } from "react-google-autocomplete";

export default function Buscador ()  {
  const { ref } = usePlacesWidget({
    apiKey: 'AIzaSyC9solbk3q4EuYuef97FhGJJnDAD83jvAs',
    onPlaceSelected: (place) => {
      console.log(place);
    },
    options: {
      types: ["(regions)"]
    },
  });

  return <input ref={ref} style={{ width: "90%" }} defaultValue="Amsterdam" />;
};