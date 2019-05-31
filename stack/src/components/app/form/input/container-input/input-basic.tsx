import * as React from 'react';
import { PureComponent, Fragment } from 'react';
import { Form, Drawer, Button, Row, Col, List, Typography, Divider } from 'antd';
import { ColProps } from 'antd/lib/col'
import { FormInputProps, FormInputItem } from '@/components/global/forminput';
import ArrayInput from '@/components/global/forminput/array-input';
import styles from './style/index.less';

export interface InputBasicGrid {
  title: {
    [key: string]: any;
  };
  grid: {
    [key: string]: ColProps;
  };
  transform: (key: string, value: any, data?: any) => any;
}

export interface InputBasicProps<T> extends FormInputProps<T> {
  title: string;
  name: string;
  btnText: string;
  width?: number;
  input: React.ComponentClass<any, any> | (() => React.ReactElement);
  grid: InputBasicGrid;
  action: React.ReactNode;
  inputProps?: { [key: string]: any };
}

const Grid = ({ data, grid, style, isContent }: { data?: { [key: string]: any }, grid: InputBasicGrid, style?: React.CSSProperties; isContent?: boolean }) => (
  <Row gutter={8} style={style}>
    {Object.entries(grid.title).map(([key, value]) => {
      return <Col key={key} {...grid.grid[key]}>
        <Typography.Text>{isContent ? grid.transform(key, data![key], data) : value}</Typography.Text>
      </Col>
    })}
  </Row>
)

class InputBasic<T> extends PureComponent<InputBasicProps<T[]>, any> {
  static readonly defaultProps = {
    form: {},
    type: 'create',
    value: [],
    width: 482,
    onChange: () => null,
  };

  state = {
    visible: false,
  }

  _onClose = (e: any) => {
    if (!!e) e.preventDefault();
    (this.props.form as any).validateFields(async (error: any, values: any) => {
      if (!error) {
        this.setState({
          visible: false,
        })
      }
    })
  }

  render() {
    const { title, name, width, btnText, input, inputProps, grid, action, value, form } = this.props;
    const { getFieldError, getFieldDecorator } = form;
    const { visible } = this.state;
    const errors = Object.values(getFieldError(name) || []).filter(v => !!v).join(',');
    return (
      <FormInputItem
        required
        validateStatus={errors ? 'error' : 'success'}
        help={errors}
      >
        <List
          className={styles.box}
          locale={{
            emptyText: null
          }}
          header={(
            <Fragment>
              {React.cloneElement(action as any, {
                onClick: (e: any) => {
                  e && e.preventDefault();
                  this.setState({ visible: true });
                }
              })}
              {(value! || []).length > 0 && <div style={{ marginTop: 8, padding: 8, backgroundColor: '#F7F7F7' }}>
                <Grid grid={grid} />
              </div>}
            </Fragment>
          )}
          footer={(
            <Drawer
              title={title}
              width={width}
              placement="right"
              onClose={this._onClose}
              visible={visible}
            >
              <Form>
                <FormInputItem>
                  {getFieldDecorator(name, {
                    initialValue: value || [],
                    rules: [],
                  })(
                    <ArrayInput<T>
                      allList={value || []}
                      input={input}
                      inputProps={inputProps}
                      btnText={btnText}
                      header={<Grid grid={grid} />}
                    />
                  )}
                </FormInputItem>
              </Form>
              <div className={"node-actions"} >
                <Button onClick={this._onClose} type="primary"> 确认 </Button>
              </div>
            </Drawer>
          )}

          dataSource={(value || [])}
          renderItem={(data: T) => (
            <List.Item>
              <Grid
                style={{ padding: `0 8px`, width: `calc(100% + 8px)` }}
                isContent
                data={data}
                grid={grid}
              />
            </List.Item>
          )}
        />
      </FormInputItem>
    )
  }
}

export default InputBasic;