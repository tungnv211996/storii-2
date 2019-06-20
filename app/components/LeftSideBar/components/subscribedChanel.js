import React from 'react';
import { mapCss, changeAlias } from '../../../libs/extensions';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import Parse from '../../../parse/parseServer';
const liveImage = require('../../../assets/images/live.png');
import Stores from '../../../storeConfig/register';
import { withRouter } from 'react-router-dom';

@inject(Stores.LeftSideBarStore)
@observer
class SubscribedChanel extends React.Component {
  @observable chanels = [];

  async componentDidMount() {
    this.chanels = await Parse.Cloud.run('getMyChanels');
  }
  nagative(item) {
    this.props.history.push(`/chanel/${changeAlias(item.fullname)}/${item.id}`)
  }
  render() {
    const { isToggle } = this.props.leftSideBarStore;
    return (
      <div className={mapCss('message-center')} hidden={isToggle}>
        <li className={mapCss("nav-small-cap")}>--- Kênh đã đăng kí</li>
        {
          this.chanels.map(item => {
            return (
              <li key={item.id}>
                <a href="javascript:void(0)">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <span className={mapCss('btn', 'btn-sm', 'btn-circle', 'left')}
                            onClick={() => this.nagative(item)}
                            style={{
                              backgroundImage: `url(${item.avatar})`,
                              backgroundPosition: 'center',
                              backgroundSize: 'cover'
                            }}>
                          </span>
                        </td>
                        <td style={{ width: 200 }}>
                          <span className={mapCss('chanel_name', 'pl-2')}>
                            {item.fullname}
                          </span>
                        </td>
                        <td>
                          <span> {item.liveStreaming && <img src={liveImage} style={{ width: 32 }} />} </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </a>
              </li>
            )
          })
        }
      </div>
    )
  }
}
export default withRouter(SubscribedChanel)