import { useEffect } from 'react'
import * as THREE from 'three'

function Example1() {
    useEffect(() => {
        // 建立基本的場景、相機、渲染器，並且綁定到HTML中的app標籤
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        )
        const renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        document.getElementById('example1App').appendChild(renderer.domElement)

        // 定義了一片三角網格
        const geometry = new THREE.BufferGeometry()
        geometry.addAttribute(
            'position',
            new THREE.Float32BufferAttribute([-2, 0, 0, 1, 0, 0, 0, 1, 0], 3)
        )

        // 定義了三角網格的法向量方向，用來判斷網格的正反面方向
        geometry.addAttribute(
            'normal',
            new THREE.Float32BufferAttribute([0, 0, 1, 0, 0, 1, 0, 0, 1], 3)
        )

        // 用Phong的著色方法設定材質的效果，此語法預設會將網格進行正常的單面著色，若是將DoubleSide參數打開的話就會改為雙面著色。
        const material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            color: 0xff0000,
        })

        // 將幾何模型與材質設定加入場景
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)

        // 加上框線
        const wireframe = new THREE.WireframeGeometry(geometry)
        const line = new THREE.LineSegments(wireframe)
        line.material.color = new THREE.Color(0x00ff00)
        scene.add(line)

        // 加上光源
        const light = new THREE.PointLight(0xffffff, 1.0)
        light.position.set(0, 1, 1)
        scene.add(light)

        // 相機初始位置
        camera.position.z = 3

        // 旋轉參數，讓三角網格對著Y軸旋轉，，並且不斷更新繪圖
        const animate = function () {
            requestAnimationFrame(animate)
            // mesh.rotation.y += 0.03
            // line.rotation.y += 0.03
            renderer.render(scene, camera)
        }

        animate()
    }, [])
    return (
        <div>
            <div id="example1App"></div>
        </div>
    )
}

export default Example1
