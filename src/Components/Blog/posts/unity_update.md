- Update : 프레임 단위로 호출됨
- LateUpdate : Update 호출 뒤 불리게 됨
- FixedUpdate : 고정 단위로 불리게 되는 함수

여기는 FixedUpdate의 '고정 단위'를 아는게 중요합니다. 이 고정 단위는 물리 엔진에 의해 결정이 되므로 컴퓨터 성능에 따라 프레임이 다르게 나와 호출 간격이 일정하지 않은 Update와는 달리 일정하게 불리게 됩니다. 이런 이유로 인해서 Rigidbody를 조작할 때는 FixedUpdate를 사용하게 됩니다.

**Rigidbody를 조작할 때** 주로 **FixedUpdate**를 사용하는 이유는 Unity의 물리 엔진(PhysX)의 작동 방식과 관련이 있습니다. 이를 설명하면 아래와 같습니다:

---

### 1. **FixedUpdate와 물리 엔진의 동기화**

- Unity의 물리 엔진(PhysX)은 **고정된 시간 간격(Time Step)**으로 업데이트됩니다. 이 시간 간격은 Unity 설정에서 **Time.fixedDeltaTime**으로 정의되며, 기본값은 **0.02초(50FPS)**입니다.
- **FixedUpdate**는 바로 이 물리 업데이트와 동일한 고정 시간 간격으로 호출됩니다. 따라서 **FixedUpdate** 안에서 물리 연산을 수행하면, 물리 엔진과 완벽히 동기화된 상태에서 Rigidbody를 조작할 수 있습니다.
- 반면 **Update**는 **프레임 속도**(FPS)에 따라 호출되므로, 호출 간격이 컴퓨터 성능이나 프레임 드롭에 따라 달라질 수 있습니다. 이런 불규칙성은 물리 연산에 부정확한 결과를 초래할 수 있습니다.

---

### 2. **Rigidbody의 물리적 특성과 Update 호출 간의 차이**

- Rigidbody는 Unity의 물리 엔진에서 관리하는 객체입니다. 물리 엔진은 **위치(Position)**, **속도(Velocity)**, **회전(Rotation)** 등을 계산할 때 고정된 시간 간격을 사용합니다.
- **Update**에서 Rigidbody를 조작하면, 호출 간격이 불규칙하므로 물리 계산이 일관성을 잃게 됩니다.
    - 예: 프레임 속도가 30FPS에서 60FPS로 바뀌면, 같은 코드에서도 Rigidbody의 움직임 속도가 다르게 나타날 수 있음.
- **FixedUpdate**를 사용하면 물리 엔진의 고정 시간 간격에 맞춰 Rigidbody를 안정적으로 조작할 수 있습니다.

### 4. **Rigidbody 조작은 물리 연산과 관련**

Rigidbody를 조작하는 것은 단순히 위치를 설정하는 것이 아니라 물리 엔진에서 속도와 가속도를 계산하여 **물리적 상호작용**을 처리하는 것을 의미합니다. 이를 위해 FixedUpdate를 사용하는 이유는:

1. **일정한 호출 간격**: FixedUpdate는 물리 엔진과 동일한 시간 간격으로 실행되므로, 물리 연산이 안정적으로 처리됩니다.
2. **Force, Torque 적용**: Rigidbody에 `AddForce`, `AddTorque` 등의 힘을 가할 때는 고정된 시간 간격으로 힘을 더해야 물리적 시뮬레이션이 정확히 작동합니다.
3. **예측 가능한 결과**: FixedUpdate를 사용하면 컴퓨터 성능(FPS)과 무관하게 동일한 물리적 동작을 얻을 수 있습니다.

---

### 5. **Update에서 Rigidbody를 조작하면 안 되는 이유**

- Update의 호출 간격은 FPS에 따라 달라지므로, 물리 엔진의 고정 시간 간격과 맞지 않게 됩니다.
- 물리 엔진은 **FixedUpdate**를 기준으로 상태를 업데이트하므로, Update에서 Rigidbody를 조작하면 물리 엔진의 계산과 충돌할 가능성이 있습니다.
- 예: `rb.velocity`를 Update에서 계속 설정하면, 물리 엔진이 계산한 속도를 덮어쓰거나 충돌 처리가 제대로 이루어지지 않을 수 있습니다.

---

### 6. **Transform과 Rigidbody의 차이**

- Transform을 직접 조작하는 경우에는 **Update**를 사용해도 문제가 없습니다. 하지만 Transform은 물리 엔진과는 별개로 처리되므로, Rigidbody와 Transform을 동시에 사용하면 물리 계산이 꼬일 수 있습니다.
    - Transform을 움직이고 싶다면 **Rigidbody.MovePosition** 또는 **Rigidbody.MoveRotation**을 사용하며, 이를 FixedUpdate에서 호출하는 것이 올바른 방식입니다.

유니티에서의 `FixedUpdate` 함수는 게임 개발에 있어 핵심적인 역할을 수행합니다. 이 함수는 주로 물리 계산을 다루는 코드를 실행하기 위해 사용됩니다. `FixedUpdate`는 일정한 시간 간격으로 호출되며, 이 간격은 유니티 에디터의 Time 설정에서 조절할 수 있는 ‘Fixed Timestep’에 의해 결정됩니다. 기본적으로 이 값은 0.02초(초당 50회 호출)로 설정되어 있어, 게임의 물리 시뮬레이션을 안정적으로 유지할 수 있습니다.

`FixedUpdate`는 주로 물리 기반의 움직임을 다룰 때 사용됩니다. 예를 들어, 자동차나 볼링공 같은 객체가 게임 세계에서 자연스러운 물리 법칙을 따르며 움직이게 하려면 이 함수 내에서 그 움직임을 처리하는 것이 적합합니다.

```
using UnityEngine;

public class PlayerController : MonoBehaviour
{
    publicRigidbody rb;
    public float force = 10f;

    void FixedUpdate()
    {
        // 플레이어에게 앞으로 이동하도록 힘을 가함
        rb.AddForce(Vector3.forward * force);
    }
}

```

이 예제에서 `FixedUpdate`는 Rigidbody 컴포넌트를 가진 객체에 지속적으로 힘을 추가하여 일정한 방향으로 이동시키는 데 사용됩니다. `FixedUpdate`를 사용하는 이유는 물리 엔진과의 상호작용이 필요하기 때문으로, `Update` 함수에서 물리 계산을 수행하면 프레임 속도의 변동에 따라 물리 행동이 일관성 없게 될 수 있습니다.

# **유사한 기능을 제공하는 다른 유니티 함수와의 비교**

`FixedUpdate`와 비교되는 또 다른 중요한 함수는 `Update`와 [`LateUpdate`](https://www.ibatstudio.com/%ec%9c%a0%eb%8b%88%ed%8b%b0-lateupdate-%ed%95%a8%ec%88%98%ec%9d%98-%ec%9d%b4%ed%95%b4/)입니다.

### **Update 함수**

이 함수는 매 프레임마다 호출되며, 프레임 속도에 따라 호출 간격이 변동됩니다. 일반적으로 사용자 입력 처리나 간단한 계산, 애니메이션 업데이트 등이 이곳에서 처리됩니다.

### **LateUpdate 함수**

Update 함수 이후에 호출되며, 모든 Update 함수가 실행된 후에 실행됩니다. 이 함수는 주로 카메라의 움직임과 같은 후처리 작업에 사용됩니다.

`FixedUpdate`는 주로 물리 업데이트에 적합한 반면, `Update`는 그래픽 업데이트나 사용자 입력 처리에 더 적합하다고 볼 수 있습니다. `LateUpdate`는 `Update`에서 처리된 모든 계산이 완료된 후 필요한 조정을 추가로 수행하기에 적합합니다.

# **Q&A**

**Q1: FixedUpdate가 매 프레임마다 호출되지 않는 이유는 무엇인가요?**

**A1**: `FixedUpdate`는 물리 계산을 일관되게 처리하기 위해 고정된 시간 간격으로 호출됩니다. 프레임 속도의 변동성으로 인해 물리 계산이 불규칙하게 되는 것을 방지하기 위함입니다.

**Q2: FixedUpdate 내에서 물리 계산 외의 코드를 실행해도 되나요?**

**A2**: 가능은 하지만 권장되지 않습니다. `FixedUpdate`는 물리 업데이트에 최적화되어 있기 때문에, 물리 계산이 아닌 다른 종류의 계산은 `Update`나 `LateUpdate`에서 처리하는 것이 좋습니다.

**Q3: FixedUpdate의 호출 빈도를 조절하고 싶다면 어떻게 해야 하나요?**

**A3**: 유니티 에디터에서 Time 설정에 있는 ‘Fixed Timestep’ 값을 조정하여 `FixedUpdate`의 호출 빈도를 조절할 수 있습니다. 더 정밀한 물리 시뮬레이션을 원한다면 이 값을 줄일 수 있습니다.