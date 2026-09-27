import type { ComponentPropMetadata } from "@/types/docs";

export default function PropsTable({ props }: { props: ComponentPropMetadata[] }) {
  return (
    <section className="docs-frame" id="props">
      <div className="docs-frame-heading">
        <h2>Props</h2>
        <span>{props.length} properties</span>
      </div>
      <div className="docs-table-scroll" tabIndex={0} role="region" aria-label="컴포넌트 속성 표">
        <table className="docs-props-table">
          <caption className="sr-only">컴포넌트 속성, 타입, 기본값과 설명</caption>
          <thead>
            <tr>
              <th scope="col">Property</th>
              <th scope="col">Type</th>
              <th scope="col">Default</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop) => (
              <tr key={prop.name}>
                <th scope="row">
                  <code>{prop.name}</code>
                  {prop.required && <small className="docs-required">필수</small>}
                </th>
                <td>
                  <code>{prop.type}</code>
                </td>
                <td>
                  <code>{prop.defaultValue ?? "—"}</code>
                </td>
                <td>
                  {prop.description ||
                    (prop.required
                      ? "필수 속성입니다. 타입과 사용 예제를 참고하세요."
                      : "선택 속성입니다. 타입과 소스 코드를 참고하세요.")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!props.length && <p className="docs-empty">별도로 설정하는 Props가 없는 컴포넌트입니다.</p>}
      </div>
    </section>
  );
}
