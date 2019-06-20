import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import Parse from '../../../parse/parseServer';
import Thumbnail from '../../../components/Thumbnail';
import { mapCss } from '../../../libs/extensions';
import { Spin, Icon } from 'antd';
import Spinter from '../../../components/Spinter';
import Stores from '../../../storeConfig/register';
import SkeletonCutomize from '../../../components/Skeletion';
import appConst from '../../../libs/appConst';

@inject(Stores.MediaContentStore)
@observer
export default class Suggestion extends React.Component {
  @observable spinning = false;

  componentDidMount = async () => {
    this.spinning = true;
    await this.props.mediaContentStore.fetchSuggestion()
      .finally(() => this.spinning = false);
  }

  render() {
    const { suggestions } = this.props.mediaContentStore;
    return (

      // <Spin spinning={this.spinning} size="large" indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />}>
      <div>
        <div hidden={!this.spinning}>
          <SkeletonCutomize pageSize={appConst.defaultPageSize} />
        </div>
        <div hidden={this.spinning} className={mapCss('row')}>
          {
            suggestions.map(item => <Thumbnail infoMedia={item} key={item.id} />)
          }
        </div>
      </div>
      // </Spin>
    )
  }
}