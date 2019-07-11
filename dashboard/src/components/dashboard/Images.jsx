import styles from './style/Images.less';
import { Link } from 'dva/router';
import { Spin, Table, Tooltip } from 'antd';
import Box from './Box';
import EllipsisTooltip from 'library';

const Images = ({ data, loading }) => {
    return (
        <Spin spinning={loading}>
            <Box
                className={styles[`images`]}
                title='镜像使用量排名'
                extra={<span className={styles[`more`]}><Link to="/registry/imagelist">查看全部</Link></span>}
            >
                <div className={styles[`charts`]}>
                    <Table
                        bordered={false}
                        showHeader={false}
                        pagination={false}
                        dataSource={data.map(item => {
                            item.key = item.repository_id;
                            return item;
                        }).filter((item, index) => {
                            return index < 7;
                        })
                        }
                        columns={[
                            {
                                title: "num",
                                key: 'num',
                                dataIndex: 'num',
                                render: (t, r, i) => i < 3 ?
                                    <span className={`${styles[`dot`]} ${styles[`one`]}`}>{i + 1}</span>
                                    : <span className={styles[`dot`]}>{i + 1}</span>,
                                width: 32
                            },
                            {
                                title: 'repository_name',
                                key: 'repository_name',
                                dataIndex: 'repository_name',
                                render: (t) => <EllipsisTooltip>
                                    <Tooltip title={t}>
                                        <span>{t}</span>
                                    </Tooltip>
                                </EllipsisTooltip>,
                            }, {
                                title: 'pull_count',
                                key: 'pull_count',
                                dataIndex: 'pull_count',
                                width: 60,
                                render: (t) => <p style={{ textAlign: 'right' }}>{t}</p>
                            }
                        ]}
                    />
                </div>
            </Box>
        </Spin>
    );
}

export default Images;
