import { useEffect } from 'react'
import * as THREE from 'three'

function D04() {
    useEffect(() => {
        // 建立場景
        let scene = new THREE.Scene()

        // 建立渲染器
        let renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight) // 場景大小
        renderer.setClearColor(0xeeeeee, 1.0) // 預設背景顏色
        renderer.shadowMap.enable = true // 陰影效果
        document.getElementById('d04App').appendChild(renderer.domElement) // 將渲染器的 DOM 綁到網頁上

        // 建立相機
        let camera = new THREE.PerspectiveCamera(
            10,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        ) // 攝像機視錐體垂直視野角度、攝像機視錐體長寬比、攝像機視錐體近端面、攝像機視錐體遠端面
        camera.position.set(10, 10, 10) // 相機位置
        camera.lookAt(scene.position) // 相機焦點

        // 建立光源
        let pointLight = new THREE.PointLight(0xffffff)
        pointLight.position.set(10, 10, -10)
        scene.add(pointLight)

        // 建立物體
        let geometry = new THREE.BoxGeometry(1, 1, 1) // 幾何體
        let material = new THREE.MeshPhongMaterial({
            // 材質
            color: 0x88aaff,
            transparent: false, // 透明
            opacity: 0.8, // 透明度
            specular: 0xff0000, // 鏡面反射的顏色
            shininess: 30, // 鏡面反射的程度
        })
        let cube = new THREE.Mesh(geometry, material) // 建立網格物件
        cube.position.set(0, 0, 0)
        scene.add(cube)

        // 建立動畫
        function animate() {
            cube.rotation.x += 0.01
            cube.rotation.y += 0.01
            // cube.rotation.z += 0.01
        }

        // 渲染場景
        function render() {
            animate()
            requestAnimationFrame(render) // 若是要讓場景中的物體動起來，就需要處理「每隔一段時間重新渲染場景」的工作，而這就是requestAnimationFrame 所負責的部分
            renderer.render(scene, camera)
        }
        render()

        // 其他設定
        // 監聽螢幕寬高變化來做簡單 RWD 設定
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            document.getElementById('d04App').innerHTML = ''
            scene = null
            renderer = null
            camera = null
            pointLight = null
            geometry = null
            material = null
            cube = null
        }
    }, [])
    return (
        <div>
            <div id="d04App"></div>
        </div>
    )
}

export default D04
