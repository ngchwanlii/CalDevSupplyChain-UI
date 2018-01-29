import React from 'react';
import { Button, Col, Layout, Row } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './HomePage.less';
import TypistLoop from 'react-typist-loop';
import Typist from 'react-typist';
import {
  ArmaniSVG,
  ComputerSVG,
  HnMSVG,
  MangoSVG,
  ZaraSVG,
} from '../../assets/banner/home-page';
import {
  BoxSVGIcon,
  ContactsSVGIcon,
  OrderSVGIcon,
  ReportSVGIcon,
} from '../../assets/icon';
import { FeatureCardWithIcon } from '../../components/Card';

const { Header, Footer, Content } = Layout;

const Logo = props => {
  const { title, className } = props;
  return <h2 className={className}>{title}</h2>;
};

const HomeBanner = props => {
  const { bannerTexts } = props;
  console.log('check something inside homebanner: ', bannerTexts);
  return (
    <div>
      <Row className={styles.homeBannerContainer}>
        <Col xs={24} sm={12}>
          <Row
            className={styles.homeBannerTextRowContainer}
            type="flex"
            justify="center"
            align="middle"
          >
            <Col className={styles.homeBannerTextColContainer}>
              <div className={styles.homeBannerTitleLineContainer}>
                <div className={styles.homeBannerTitleLine} />
              </div>
              <h1 className={styles.homeBannerHeading}>Supply Chain Service</h1>
              <div className={styles.homeBannerSubHeading}>{bannerTexts}</div>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={12}>
          <Row
            className={styles.homeBannerIconContainer}
            type="flex"
            justify="center"
            align="middle"
          >
            <Col>
              <ComputerSVG width={400} height={400} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const partnersList = {
  mango: MangoSVG,
  armani: ArmaniSVG,
  zara: ZaraSVG,
  hnm: HnMSVG,
};
const PartnersBanner = props => {
  const { partners } = props;
  const partnersGridSm = 24 / Object.keys(partners).length;

  return (
    <div className={styles.partnersBannerContainer}>
      <Row className={styles.partnersBannerTitleContainer}>
        <Col xs={24}>
          <h2>Trusted by Industry Partners</h2>
        </Col>
      </Row>
      <Row>
        {Object.keys(partners).map((name, i) => {
          const PartnerComponent = partners[name];
          return (
            <Col key={name + i} xs={24} sm={partnersGridSm}>
              <Row className={styles.partnersLogoContainer}>
                <Col className={styles.partnersLogo}>
                  <PartnerComponent width={100} height={100} />
                </Col>
              </Row>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

const featuresListData = {
  inventory: {
    title: 'Inventory',
    component: BoxSVGIcon,
    content:
      'Inventory utilization and fulfillment efficiencies in real time. Keep track products and restock across multiple locations and channels.',
  },
  order: {
    title: 'Order',
    component: OrderSVGIcon,
    content:
      'Manage all your orders in one place, arrange fulfillments and get paid 3x faster. Deliver the perfect order every time.',
  },
  contacts: {
    title: 'Contacts',
    component: ContactsSVGIcon,
    content:
      'Empowers organizations to improve the information flow across the business relationships that drive the supply chain. ',
  },
  report: {
    title: 'Report',
    component: ReportSVGIcon,
    content:
      'Enjoy the benefits of advanced analytics and proactively predict, assess and mitigate disruptions and risks without the complexity.',
  },
};
const FeaturesContent = props => {
  const { featuresData } = props;

  return (
    <div className={styles.featuresContainer}>
      <div className={styles.featuresTitleContainer}>
        <h1>Features</h1>
      </div>
      <div className={styles.featuresCardBlock}>
        <Row>
          {Object.keys(featuresData).map((key, i) => {
            const featureData = featuresData[key];
            return (
              <Col key={key + i} xs={24} md={12}>
                <Row type={'flex'} justify={'center'} align={'middle'}>
                  <Col>
                    <FeatureCardWithIcon {...featureData} />
                  </Col>
                </Row>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

class HomePage extends React.Component {
  state = {
    animatedBannerTexts: null,
  };

  componentDidMount() {
    const animatedBannerTexts = (
      <TypistLoop interval={5000}>
        {[
          'that provide intelligent, personalized experiences',
          'that provide transparency into supply chain process',
          'to power up your business',
        ].map(text => (
          <Typist key={text} startDelay={1000} className="banner-subheading">
            {text}
          </Typist>
        ))}
      </TypistLoop>
    );
    this.setState({ animatedBannerTexts });
  }

  render() {
    const { animatedBannerTexts } = this.state;

    return (
      <div>
        <Layout className={styles.layout}>
          <Header className={styles.appHeader}>
            <Row>
              <Col xs={24} sm={6}>
                <Row type="flex" justify="center" align="middle">
                  <Col className={styles.logoNav}>
                    <Logo className={styles.logo} title="Design A Difference" />
                  </Col>
                </Row>
              </Col>
              <Col xs={24} sm={3}>
                <Row type="flex" justify="center" align="middle">
                  <Col className={styles.nav}>
                    <Link
                      className={classNames([
                        styles.navMenu,
                        styles.navMenuBorderTop,
                      ])}
                      to="/product"
                    >
                      Product
                    </Link>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} sm={3}>
                <Row type="flex" justify="center" align="middle">
                  <Col className={styles.nav}>
                    <Link className={styles.navMenu} to="/integration">
                      Integration
                    </Link>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} sm={3}>
                <Row type="flex" justify="center" align="middle">
                  <Col className={styles.nav}>
                    <Link className={styles.navMenu} to="/resources">
                      Resources
                    </Link>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} sm={3}>
                <Row type="flex" justify="center" align="middle">
                  <Col className={styles.nav}>
                    <Link className={styles.navMenu} to="/support">
                      Support
                    </Link>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} sm={3}>
                <Row type="flex" justify="center" align="middle">
                  <Col className={styles.nav}>
                    <Link
                      to="/signup"
                      className={classNames(
                        styles.navMenu,
                        styles.signupButtonContainer,
                      )}
                    >
                      <Button type="primary">Signup</Button>
                    </Link>
                  </Col>
                </Row>
              </Col>
              <Col xs={24} sm={3}>
                <Row type="flex" justify="center" align="middle">
                  <Col className={styles.nav}>
                    <Link
                      to="/user/login"
                      className={classNames(
                        styles.navMenu,
                        styles.loginButtonContainer,
                      )}
                    >
                      <Button>Login</Button>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Header>
          <Content>
            <HomeBanner bannerTexts={animatedBannerTexts} />
            <PartnersBanner partners={partnersList} />
            <FeaturesContent featuresData={featuresListData} />
          </Content>
          <Footer className={styles.appFooter}>
            Copyright © 2018 Design A Difference Inc.
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default HomePage;
