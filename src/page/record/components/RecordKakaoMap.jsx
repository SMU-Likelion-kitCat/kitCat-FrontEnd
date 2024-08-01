// import React, { useRef, useState, useEffect } from "react"
// import KakaoMap from "../../../components/KakaoMap"

// const RecordKakaoMap = ({ record }) => {
//   const { locations } = record
//   const [isInView, setIsInView] = useState(false)
//   const mapRef = useRef(null)

//   console.log("들어온 산책 전용 읽기 record  객체", record)
//   console.log("들어온 산책 전용 읽기 locations 객체", locations)
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsInView(true)
//             observer.disconnect()
//           }
//         })
//       },
//       { threshold: 0.1 }
//     )
//     if (mapRef.current) {
//       observer.observe(mapRef.current)
//     }

//     return () => {
//       if (mapRef.current) {
//         observer.unobserve(mapRef.current)
//       }
//     }
//   }, [])

//   if (!locations || locations.length === 0) {
//     return null
//   }

//   return (
//     <div ref={mapRef} style={{ height: "400px", width: "100%" }}>
//       {isInView && (
//         <KakaoMap
//           location={locations[0]}
//           path={locations}
//           readWalkPath={true}
//         />
//       )}
//     </div>
//   )
// }

// export default RecordKakaoMap

import React, { useRef, useState, useEffect } from "react"
import KakaoMap from "../../../components/KakaoMap"

const RecordKakaoMap = ({ record, mapId }) => {
  const { locations } = record
  const [isInView, setIsInView] = useState(false)
  const mapRef = useRef(null)

  console.log(`들어온 산책 전용 읽기 record 객체 ${mapId}`, record)
  console.log(`들어온 산책 전용 읽기 locations 객체 ${mapId}`, locations)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    if (mapRef.current) {
      observer.observe(mapRef.current)
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current)
      }
    }
  }, [])

  if (!locations || locations.length === 0) {
    return null
  }

  return (
    <div ref={mapRef} style={{ width: "100%" }}>
      {isInView && (
        <KakaoMap
          location={null}
          path={locations}
          readWalkPath={true}
          mapId={mapId}
        />
      )}
    </div>
  )
}

export default RecordKakaoMap
