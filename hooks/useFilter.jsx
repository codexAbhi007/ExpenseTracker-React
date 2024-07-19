import { useState } from "react";

export function useFilter(arr, key) {
  const [query, setQuery] = useState("");

  const filteredData = arr?.filter((data) =>{
    console.log(data)
    if (data){
      return data[key]?.toLowerCase().includes(query)
    }
    
  }
  );

  return [filteredData, setQuery];
}
