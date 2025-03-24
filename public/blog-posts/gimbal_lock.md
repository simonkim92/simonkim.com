---
title: "Gimbal Lock?!"
date: "2025-02-26"
imageSrc: "/images/gimbal_lock.png"
---

짐벌락(Gimbal Lock)이란?
짐벌락(Gimbal Lock)은 3D 회전 시스템에서 특정 각도에 도달했을 때 회전 축 중 하나가 다른 축과 정렬되면서 자유로운 회전이 제한되는 문제입니다. 쉽게 말해, 원래는 세 개의 축(X, Y, Z)으로 회전할 수 있어야 하지만, 특정 상황에서 하나의 축이 사라져서 두 개의 축만 남게 되는 현상입니다.

짐벌락이 발생하는 원리
회전은 오일러 각(Euler Angles) 이라는 방식으로 표현할 수 있는데, 이는 X, Y, Z 세 축을 기준으로 특정 순서대로 회전하는 방식입니다. 하지만 특정한 회전값에서 두 개의 축이 같은 방향으로 정렬되면, 하나의 회전 자유도가 사라지는 문제가 생깁니다.

예를 들어, 비행기 조종을 생각해보겠습니다. 비행기의 방향을 오일러 각으로 표현하면 롤(Roll, X축), 피치(Pitch, Y축), 요(Yaw, Z축) 세 가지가 있습니다.

피치(Pitch)를 90도로 만들면 롤(Roll)과 요(Yaw) 축이 동일한 평면 위에 놓이면서 더 이상 독립적으로 조정할 수 없는 상태가 됩니다.
즉, 두 개의 회전이 같은 역할을 하게 되어 한 축이 사라지는 문제가 발생합니다.
짐벌락을 코드로 확인해보기
Unity의 C#을 예제로, 오일러 각을 사용해서 회전할 때 짐벌락이 발생하는 것을 확인하는 코드입니다.

using UnityEngine;

public class GimbalLockExample : MonoBehaviour
{
void Update()
{
// 피치를 90도로 설정하면 짐벌락이 발생할 수 있음
transform.rotation = Quaternion.Euler(90, transform.eulerAngles.y, transform.eulerAngles.z);
}
}
위 코드에서는 오일러 각을 사용하여 피치(Pitch, Y축 회전)를 90도로 고정합니다.
이렇게 하면 X축(Roll)과 Z축(Yaw)이 같은 평면에서 회전하게 되어 짐벌락이 발생할 수 있습니다.

짐벌락을 해결하는 방법
쿼터니언(Quaternion) 사용하기

Unity에서는 Quaternion을 사용하면 짐벌락을 방지할 수 있습니다.
Quaternion은 4차원 공간에서 회전을 표현하는 방식으로, 중간 축이 정렬되는 문제가 없습니다.

using UnityEngine;

public class SafeRotation : MonoBehaviour
{
void Update()
{
float speed = 50f;
float x = Input.GetAxis("Horizontal") _ speed _ Time.deltaTime;
float y = Input.GetAxis("Vertical") _ speed _ Time.deltaTime;

        // 오일러 각이 아니라 Quaternion을 사용하여 회전
        transform.rotation *= Quaternion.Euler(y, x, 0);
    }

}
위 코드에서는 Quaternion.Euler(y, x, 0)을 사용하여 누적 회전을 적용하여 짐벌락을 피합니다.
오일러 각을 직접 수정하지 않기

transform.eulerAngles를 직접 수정하는 대신, Quaternion을 활용하여 보간(Lerp)하거나 Rotate 함수를 사용하는 것이 좋습니다.
회전 행렬(Rotation Matrix) 사용하기

3D 수학적으로 회전을 행렬로 표현하면 짐벌락을 방지할 수 있습니다. 하지만 일반적으로 게임 엔진에서는 Quaternion을 활용하는 것이 더 간편합니다.
정리
짐벌락은 특정한 회전 각도에서 두 개의 축이 정렬되면서 하나의 축이 사라지는 현상입니다.
오일러 각을 사용할 때 짐벌락이 발생할 수 있습니다.
이를 방지하려면 쿼터니언(Quaternion) 을 사용하거나 회전 행렬(Rotation Matrix) 을 활용하면 됩니다.
Unity에서는 Quaternion을 이용한 회전이 짐벌락을 해결하는 가장 일반적인 방법입니다.
