---
title: "DontDestroyOnLoad"
date: "2025-03-16"
imageSrc: "/images/dont_destroy_on_load.png"
---

Unity에서 DontDestroyOnLoad에 대한 상세 설명
Unity에서 **DontDestroyOnLoad**는 씬이 변경되더라도 특정 게임 오브젝트가 삭제되지 않도록 유지하는 데 사용됩니다. 이를 활용하면 게임의 전반적인 상태를 유지하거나, 한 씬에서 다른 씬으로 데이터를 전달할 수 있습니다.

1. DontDestroyOnLoad란?
   Unity에서 일반적으로 씬(Scene)이 변경되면 해당 씬에 속한 모든 게임 오브젝트가 삭제됩니다. 하지만 DontDestroyOnLoad를 적용하면 씬 전환이 이루어져도 특정 오브젝트가 파괴되지 않고 유지됩니다.

using UnityEngine;

public class PersistentObject : MonoBehaviour
{
    void Awake()
    {
    DontDestroyOnLoad(gameObject);
    }
}

위 코드에서 Awake 함수 내에 DontDestroyOnLoad(gameObject);를 호출하면, 이 게임 오브젝트는 씬이 바뀌어도 유지됩니다.

2. 언제 사용하면 좋을까?
   DontDestroyOnLoad는 다음과 같은 경우에 유용합니다.

① 싱글턴 패턴과 함께 사용 (게임 매니저, 오디오 매니저 등)
게임 전체에서 하나만 존재해야 하는 오브젝트(예: 게임 매니저, 설정 데이터, 사운드 매니저 등)는 씬이 변경되더라도 유지되어야 합니다.

csharp
Copy
Edit
public class GameManager : MonoBehaviour
{
public static GameManager Instance { get; private set; }

    void Awake()
    {
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }

}
위 코드에서는 Instance가 null일 경우에만 DontDestroyOnLoad를 적용하고, 그렇지 않으면 기존 객체를 유지하면서 새롭게 생성된 객체는 삭제합니다.

② 배경 음악 유지
게임에서 배경 음악(BGM)을 유지하려면 씬이 바뀌더라도 AudioSource가 포함된 오브젝트를 유지해야 합니다.

```csharp
public class BGMManager : MonoBehaviour
{
private static BGMManager instance;

    void Awake()
    {
        if (instance == null)
        {
            instance = this;
            DontDestroyOnLoad(gameObject);
        }
        else
        {
            Destroy(gameObject);
        }
    }

}

이렇게 하면 게임의 첫 번째 씬에서 음악이 시작되면, 다른 씬으로 이동해도 음악이 끊기지 않고 지속됩니다.

③ 플레이어 데이터 유지
게임 플레이 중 플레이어의 상태(체력, 스코어 등)를 유지해야 할 경우, DontDestroyOnLoad를 사용하면 씬 전환 시에도 데이터를 보존할 수 있습니다.

3. 주의할 점
   ❌ DontDestroyOnLoad는 자동으로 정리되지 않음
   한 번 DontDestroyOnLoad로 등록된 오브젝트는 이후로 자동으로 제거되지 않기 때문에, 필요하지 않다면 수동으로 삭제해야 합니다.

csharp
Copy
Edit
Destroy(gameObject);
예를 들어, 특정 씬에서는 더 이상 유지할 필요가 없는 오브젝트는 수동으로 삭제하는 것이 좋습니다.

❌ 새로운 씬에서 중복 생성 방지
씬을 변경할 때 DontDestroyOnLoad 오브젝트가 중복 생성되지 않도록 싱글턴 패턴을 활용하는 것이 좋습니다. (앞서 소개한 GameManager 및 BGMManager 코드 참고)

4. DontDestroyOnLoad 적용된 오브젝트 찾기
   디버깅할 때 DontDestroyOnLoad로 등록된 오브젝트를 찾고 싶다면 Hierarchy 창에서는 보이지 않기 때문에 FindObjectsOfType<T>() 같은 함수를 사용해야 합니다.

csharp
Copy
Edit
var persistentObjects = FindObjectsOfType<GameObject>();
foreach (var obj in persistentObjects)
{
Debug.Log(obj.name);
}
이렇게 하면 DontDestroyOnLoad로 유지되고 있는 오브젝트를 확인할 수 있습니다.

5. 정리
   ✅ DontDestroyOnLoad는 씬이 변경되더라도 특정 오브젝트를 유지하는 기능을 제공합니다.
   ✅ 싱글턴 패턴과 함께 사용하여 중복 생성을 방지할 수 있습니다.
   ✅ 배경 음악, 게임 매니저, 플레이어 데이터 유지 등에 활용할 수 있습니다.
   ✅ DontDestroyOnLoad로 등록된 오브젝트는 자동으로 삭제되지 않으므로, 필요할 때 직접 삭제해야 합니다.
   ✅ 디버깅 시 FindObjectsOfType<GameObject>()을 활용하면 DontDestroyOnLoad로 등록된 오브젝트를 찾을 수 있습니다.

이제 DontDestroyOnLoad를 적절히 활용하여 씬 전환이 이루어져도 필요한 오브젝트를 유지해 보세요! 😊
```
