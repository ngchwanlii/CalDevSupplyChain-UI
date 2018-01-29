import React from 'react'
import styles from './index.less'
import {Col, Row} from 'antd';

export const FeatureCardWithIcon = (props) => {
  const {title, component: IconComponent, content} = props

  return (
    <div className={styles.paperContainer}>
      <Row type="flex" justify="center" align="middle" className={styles.cardTitleContainer}>
        <Col xs={6} offset={2}>
          <IconComponent width="50" height="50"/>
        </Col>
        <Col xs={14}>
          {title}
        </Col>
      </Row>
      <Row>
        <Col>
          <div className={styles.cardContentContainer}>
            {content}
          </div>
        </Col>
      </Row>
    </div>
  )
}
