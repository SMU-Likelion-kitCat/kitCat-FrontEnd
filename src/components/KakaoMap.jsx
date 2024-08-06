import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react"

const KakaoMap = forwardRef(
  (
    {
      location,
      path,
      readWalkPath = false,
      mapId,
      recordWalkPath = false,
      setLoading,
    },
    ref
  ) => {
    const mapRef = useRef(null)
    const polylineRef = useRef(null)
    const markerRef = useRef(null)
    const startFlagRef = useRef(null)

    const userPingImageSrc = process.env.REACT_APP_USER_PING_SRC_URL
    const startFlagImageSrc = process.env.REACT_APP_START_PING_SRC_URL

    useImperativeHandle(ref, () => ({
      centerMapOnCurrentLocation: () => {
        if (mapRef.current) {
          const map = mapRef.current
          const latLng = new window.kakao.maps.LatLng(
            location.latitude,
            location.longitude
          )
          map.setCenter(latLng)
        }
      },
    }))

    useEffect(() => {
      const initializeMap = () => {
        console.log("카카오맵 렌더링")
        const container = document.getElementById(mapId)
        const options = {
          center: new window.kakao.maps.LatLng(
            location.latitude,
            location.longitude
          ),
          level: 3,
        }
        const map = new window.kakao.maps.Map(container, options)
        mapRef.current = map
        map.setZoomable(false)

        const userPingImageSize = new window.kakao.maps.Size(46, 60)
        const userPingImageOption = {
          offset: new window.kakao.maps.Point(23, 60),
        }

        if (!readWalkPath) {
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
        }

        const linePath = path.map(
          (loc) => new window.kakao.maps.LatLng(loc.latitude, loc.longitude)
        )

        const polyline = new window.kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 10,
          strokeColor: "#00AF50",
          strokeOpacity: 0.48,
          strokeStyle: "solid",
        })

        polyline.setMap(map)
        polylineRef.current = polyline

        if (path.length > 0) {
          const startFlagMarkerImage = new window.kakao.maps.MarkerImage(
            startFlagImageSrc,
            userPingImageSize,
            userPingImageOption
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

        // 맵이 로딩된 후 idle 이벤트를 감지하여 setLoading(false) 호출
        window.kakao.maps.event.addListener(map, "idle", () => {
          if (setLoading) {
            setLoading(false)
          }
          console.log("맵 로딩 완료")
        })
      }

      const historyWalkMap = () => {
        if (!path || path.length === 0) {
          console.error("기록된 경로가 없음")
          return
        }

        const container = document.getElementById(mapId)
        const options = {
          center: new window.kakao.maps.LatLng(
            path[0].latitude,
            path[0].longitude
          ),
          level: 4,
        }
        const map = new window.kakao.maps.Map(container, options)
        mapRef.current = map
        map.setZoomable(false)

        const userPingImageSize = new window.kakao.maps.Size(46, 60)
        const userPingImageOption = {
          offset: new window.kakao.maps.Point(23, 60),
        }

        const startFlagImageSize = new window.kakao.maps.Size(32, 32)
        const startFlagImageOption = {
          offset: new window.kakao.maps.Point(16, 32),
        }

        const startFlagMarkerImage = new window.kakao.maps.MarkerImage(
          startFlagImageSrc,
          startFlagImageSize,
          startFlagImageOption
        )

        if (!startFlagRef.current) {
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

        const linePath = path.map(
          (loc) => new window.kakao.maps.LatLng(loc.latitude, loc.longitude)
        )

        const polyline = new window.kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 10,
          strokeColor: "#00AF50",
          strokeOpacity: 0.48,
          strokeStyle: "solid",
        })

        polyline.setMap(map)
        polylineRef.current = polyline

        const lastLocation = path[path.length - 1]

        const userPingMarkerImage = new window.kakao.maps.MarkerImage(
          userPingImageSrc,
          userPingImageSize,
          userPingImageOption
        )

        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            lastLocation.latitude,
            lastLocation.longitude
          ),
          image: userPingMarkerImage,
        })
        marker.setMap(map)
        markerRef.current = marker
      }

      const loadKakaoMaps = (callback) => {
        if (!window.kakao) {
          const script = document.createElement("script")
          const apiKey = process.env.REACT_APP_KAKAO_MAP_API_KEY
          script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services,clusterer,drawing`
          script.async = true
          script.onload = () => {
            window.kakao.maps.load(callback)
          }
          document.head.appendChild(script)
        } else {
          window.kakao.maps.load(callback)
        }
      }

      loadKakaoMaps(readWalkPath ? historyWalkMap : initializeMap)
    }, [
      location.latitude,
      location.longitude,
      path,
      readWalkPath,
      mapId,
      setLoading,
    ])

    useEffect(() => {
      if (startFlagRef.current && path.length > 0) {
        startFlagRef.current.setPosition(
          new window.kakao.maps.LatLng(path[0].latitude, path[0].longitude)
        )
      }
    }, [path])

    return (
      <div
        id={mapId}
        style={{
          width: "100%",
          height: readWalkPath ? (recordWalkPath ? "144px" : "230px") : "100%",
        }}
      />
    )
  }
)

export default React.memo(KakaoMap)
