## 🚀 Virtual Scrolling 기반 고성능 트리 컴포넌트

이 컴포넌트는 수천~수만 개의 노드가 포함된 대용량 트리 데이터를 효율적으로 렌더링할 수 있도록,
**react-window 스타일의 가상 스크롤링(Virtual Scrolling)** 방식을 바닐라 JavaScript로 직접 구현하였습니다.

데모 사이트 링크 : [https://kimnieyh.github.io/treeview-component/]()

### data 구조 예시
```json
const data = [
  {
    id: "1",
    label: "홍길동",
    data: {
      title: "대리",
      dept: "개발팀",
      email: "hong@company.com"
    },
    children: [...]
  }
];

```
`data : {}`  노드에 관한 추가정보 확장 가능 


### 기능별 구현 Todo List (✅ : 완료)
- 가상 스크롤링 ✅
- 노드 열기 / 닫기 ✅
- 노드 선택 (현재 단일 선택만 가능 멀티 선택 추가 개발 예정)
- 키보드 내비게이션
- 비동기 자식 로닝 
- 드래그 앤 드롭
- 커스텀 렌더링 (rederNode 지원)
- 트리 검색

### ✅ 성능 최적화 포인트

- **가상 렌더링(Virtual Rendering)**  
  현재 화면에 보이는 노드만 DOM에 렌더링되어, 렌더링 비용과 메모리 사용을 최소화합니다.

- **빠른 스크롤링 지원**  
  10,000개 이상의 트리 노드를 가진 데이터셋에서도 스크롤과 노드 열기/닫기 동작이 부드럽게 수행됩니다.

- **실제 DOM 렌더링 수 제한**  
  전체 노드 수와 관계없이 화면에는 약 30개 내외의 노드만 유지되므로, 브라우저 성능에 영향을 주지 않습니다.

### 🧪 성능 테스트

- **대규모 트리 테스트**: 10,000+ 노드 렌더링 테스트 완료
- **Chrome DevTools 기준**
  - Layout / Paint / Scripting 모두 안정적
  - Scroll FPS 55~60 안정 유지
- **렌더링 DOM 수**
  - `document.querySelectorAll('#treeview div').length` → 평균 20~40개 수준


---

> Inspired by react-window. This project implements similar virtual scrolling techniques using plain JavaScript.
