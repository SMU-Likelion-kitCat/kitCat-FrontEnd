import React, { useEffect, useRef } from "react"

const KakaoMap = ({ location, path }) => {
  const mapRef = useRef(null)
  const polylineRef = useRef(null)
  const markerRef = useRef(null)
  const startFlagRef = useRef(null)

  // 초기 맵 렌더링
  useEffect(() => {
    const initializeMap = () => {
      console.log("초기 맵 렌더링")
      const container = document.getElementById("map")
      const options = {
        center: new window.kakao.maps.LatLng(
          location.latitude - 0.002,
          location.longitude
        ), // 지도의 중심을 현재 위치보다 아래로 설정
        level: 3,
      }
      const map = new window.kakao.maps.Map(container, options)
      mapRef.current = map
      map.setZoomable(false)

      const userPingImageSrc =
        "https://github.com/user-attachments/assets/22b5d010-662f-47c7-9213-3dbf69cb1360" // UserPing SVG 파일 URL
      const userPingImageSize = new window.kakao.maps.Size(46, 60) // 마커 이미지 크기
      const userPingImageOption = {
        offset: new window.kakao.maps.Point(23, 60), // 마커 이미지 오프셋 조정 (상단으로 이동)
      } // 마커 이미지 옵션

      const userPingMarkerImage = new window.kakao.maps.MarkerImage(
        userPingImageSrc,
        userPingImageSize,
        userPingImageOption
      )

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(
          location.latitude,
          location.longitude
        ),
        image: userPingMarkerImage,
      })
      marker.setMap(map)
      markerRef.current = marker

      const linePath = path.map(
        (loc) => new window.kakao.maps.LatLng(loc.latitude, loc.longitude)
      )

      const polyline = new window.kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 10,
        strokeColor: "#00AF50",
        strokeOpacity: 1,
        strokeStyle: "solid",
      })

      polyline.setMap(map)
      polylineRef.current = polyline

      if (path.length > 0) {
        const startFlagImageSrc =
          "https://github.com/user-attachments/assets/c918c7f8-9e17-4e1b-b3cf-1e701c01e767" // StartFlag SVG 파일 URL
        const startFlagImageSize = new window.kakao.maps.Size(32, 32) // 마커 이미지 크기
        const startFlagImageOption = {
          offset: new window.kakao.maps.Point(16, 32), // 마커 이미지 오프셋 조정 (상단으로 이동)
        } // 마커 이미지 옵션

        const startFlagMarkerImage = new window.kakao.maps.MarkerImage(
          startFlagImageSrc,
          startFlagImageSize,
          startFlagImageOption
        )

        const startFlag = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            path[0].latitude,
            path[0].longitude
          ),
          image: startFlagMarkerImage,
        })
        startFlag.setMap(map)
        startFlagRef.current = startFlag
      }
    }

    if (!window.kakao) {
      const script = document.createElement("script")
      const apiKey = process.env.REACT_APP_KAKAO_MAP_API_KEY
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services,clusterer,drawing`
      script.async = true
      script.onload = () => {
        window.kakao.maps.load(initializeMap)
      }
      document.head.appendChild(script)
    } else {
      window.kakao.maps.load(initializeMap)
    }
  }, [])

  // 경로 수정 렌더링
  useEffect(() => {
    console.log("경로 수정 렌더링")
    if (mapRef.current && polylineRef.current && markerRef.current) {
      const newLinePath = path.map(
        (loc) => new window.kakao.maps.LatLng(loc.latitude, loc.longitude)
      )
      polylineRef.current.setPath(newLinePath)

      const lastLocation = path[path.length - 1]
      if (lastLocation) {
        const markerPosition = new window.kakao.maps.LatLng(
          lastLocation.latitude,
          lastLocation.longitude
        )
        markerRef.current.setPosition(markerPosition)
        mapRef.current.setCenter(
          new window.kakao.maps.LatLng(
            lastLocation.latitude - 0.002,
            lastLocation.longitude
          )
        ) // 지도의 중심을 현재 위치보다 아래로 설정
      }
    }
  }, [path]) // path가 변경될 때만 실행

  return <div id="map" style={{ width: "100%", height: "100%" }} />
}

export default React.memo(KakaoMap)
