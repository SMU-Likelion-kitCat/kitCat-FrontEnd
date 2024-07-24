import React, { useEffect, useRef } from "react"

const KakaoMap = ({ location, path }) => {
  const mapRef = useRef(null) // map 설정 저장 ref
  const polylineRef = useRef(null) // 폴리라인 저장 ref
  const markerRef = useRef(null) // map marker 위치 저장 ref

  // 마운트 될 때에만 적용
  useEffect(() => {
    const script = document.createElement("script")
    const apiKey = process.env.REACT_APP_KAKAO_MAP_API_KEY
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services,clusterer,drawing`
    script.async = true
    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map")
        const options = {
          center: new window.kakao.maps.LatLng(
            location.latitude,
            location.longitude
          ),
          level: 3,
        }
        // 카카오맵 설정 적용
        const map = new window.kakao.maps.Map(container, options)
        mapRef.current = map
        // 확대 불가
        map.setZoomable(false)

        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            location.latitude,
            location.longitude
          ),
        })
        marker.setMap(map)
        markerRef.current = marker

        // linePath 위경도 정보를 path 속성에 적용하는 메서드
        const linePath = path.map(
          (loc) => new window.kakao.maps.LatLng(loc.latitude, loc.longitude)
        )

        const polyline = new window.kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 3,
          strokeColor: "#FFAE00",
          strokeOpacity: 1,
          strokeStyle: "solid",
        })

        // 폴리라인 그림
        polyline.setMap(map)

        // 그려진 폴리라인 정보 저장
        polylineRef.current = polyline
      })
    }
    // index.html의 header에 <script> 태그로 추가
    document.head.appendChild(script)
  }, [])

  // 마운트와 path 속성이 변함에 따라
  useEffect(() => {
    // map이 렌더링 되었으면(ref의 존재 유무로 확인)
    if (mapRef.current && polylineRef.current && markerRef.current) {
      const newLinePath = path.map(
        (loc) => new window.kakao.maps.LatLng(loc.latitude, loc.longitude)
      )
      polylineRef.current.setPath(newLinePath)

      const lastLocation = path[path.length - 1] // path 배열의 마지막 위경도
      const markerPosition = new window.kakao.maps.LatLng(
        lastLocation.latitude,
        lastLocation.longitude
      )
      markerRef.current.setPosition(markerPosition)

      mapRef.current.setCenter(markerPosition)
    }
  }, [path])

  return <div id="map" style={{ width: "100%", height: "500px" }}></div>
}

export default KakaoMap
