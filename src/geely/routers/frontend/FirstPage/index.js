import React, { Component } from 'react'
import ReactFullPage from '@fullpage/react-fullpage'
import css from './FirstPage.module.less'
import history from '../../../../framework/customHistory'

class FirstPage extends Component {

  render () {
    return (
      <div>
        <ReactFullPage licenseKey={'OPEN-SOURCE-GPLV3-LICENSE'} render={() => (
          <ReactFullPage.Wrapper>
            <div className="section" style={styles.videoSection}>
              <video loop muted data-autoplay className={css.video}>
                <source src="https://dm30webimages.geely.com/GeelyOfficial/Files/Home/Slider/KV/15sec.mp4" type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="section" style={{...styles.section, backgroundImage: `url(${require('./imgs/section1.jpg')})`}}/>
            <div className="section" style={{...styles.section, backgroundImage: `url(${require('./imgs/section2.jpg')})`}}/>
            <div className="section" style={{...styles.section, backgroundImage: `url(${require('./imgs/section3.jpg')})`}}/>
          </ReactFullPage.Wrapper>
        )}/>
        <div className={css.goHomeButton} onClick={() => history.push(`/home/zh`)}>123</div>
      </div>
    )
  }
}

const styles = {
  videoSection: {
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
  },
  section: {
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
  },
}

export default FirstPage