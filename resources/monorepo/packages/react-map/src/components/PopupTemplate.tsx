import { get, isArray, isString, template } from 'lodash'

type TPopupTemplate = {
  heading?: ''
  content?: Record<string, any> | string
  data: Record<string, any>
  template?: string
}

const tpl = (str, data) => str ? template(str, { interpolate: /{{([\s\S]+?)}}/g })(data) : ''

function PopupTemplate(props: TPopupTemplate) {
  const { template, heading, content, data } = props

  if (template) return <div dangerouslySetInnerHTML={{__html: tpl(template, data)}} />

  return (
    <div>
      <div className="pc-heading">{tpl(heading, data)}</div>
      <hr />
      {isArray(content) ? (
        <div>
          {content?.map((c, k) => (
            <div key={k}>
              <span className='pc-content-label'>{c.label}: </span>
              {get(data, c.value)}
            </div>
          ))}
        </div>
      ) : <div dangerouslySetInnerHTML={{__html: tpl(content, data)}} />}

    </div>
  )
}

export default PopupTemplate
