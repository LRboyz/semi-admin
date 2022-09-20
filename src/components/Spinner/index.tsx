import { Spin } from "@douyinfe/semi-ui"


const FallbackSpinner = () => {

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
     <Spin size="large" />
    </div>
  )
}

export default FallbackSpinner