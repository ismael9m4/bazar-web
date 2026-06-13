"use client";

import { useState } from "react";

export default function ProductGallery({
  imagenes,
}:{
  imagenes:string[]
}) {

  const [actual,setActual] =
    useState(imagenes[0]);

  return (
    <div>

      <img
        src={actual}
        className="
        w-full
        rounded-xl"
      />

      <div
        className="
        flex
        gap-3
        mt-4"
      >

        {imagenes.map((img)=>(
          <img
            key={img}
            src={img}
            onClick={()=>
              setActual(img)
            }
            className="
            w-20
            h-20
            object-cover
            cursor-pointer
            border"
          />
        ))}

      </div>

    </div>
  );
}