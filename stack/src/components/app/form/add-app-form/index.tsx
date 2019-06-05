import * as React from 'react';
import { PureComponent } from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { FormInputItem } from '@/components/global/forminput'
import BasicForm, { AddBasicProps } from './basic';
import PortsForm, { AddPortsProps } from './ports';
import ContainersForm, { AddContainersProps } from './containers';
import { createAppRequest } from '@/services/app';

export interface AddAppFormProps extends FormComponentProps, AddBasicProps, AddPortsProps, AddContainersProps {
  data?: createAppRequest;
  type?: 'create' | 'update' | 'edit';
}

@(Form.create({
  name: 'app',
}) as any)
class AddAppForm extends PureComponent<AddAppFormProps, any> {
  static readonly defaultProps = {
    form: {},
    data: {},
    type: 'create',
  };
  render() {
    const {
      type, data, form,
      onNodeSearch, onResourceSearch, onImageSearch, onImageTagSearch, onSecretSearch, onCfgfileSearch, onPvcPoolSearch, onPvcSearch
    } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const basic = getFieldValue('basic') || {};
    return (
      <Form style={{ padding: 24, height: "100%", overflow: "auto" }}>
        <FormInputItem required>
          {getFieldDecorator('basic', {
            initialValue: data,
            rules: [],
          })(
            <BasicForm type={type} {...{ onNodeSearch, onResourceSearch }} />
          )}
        </FormInputItem>
        <FormInputItem>
          {getFieldDecorator('service', {
            initialValue: data!.service,
            rules: [],
          })(
            <PortsForm type={type} />
          )}
        </FormInputItem>
        {basic.name && <FormInputItem>
          {getFieldDecorator('containers', {
            initialValue: data!.containers || [{}],
            rules: [],
          })(
            <ContainersForm {...{ type, stateful: basic.stateful || 'none', onImageSearch, onImageTagSearch, onCfgfileSearch, onSecretSearch, onPvcPoolSearch, onPvcSearch }} />
          )}
        </FormInputItem>}

        {/* {basic.name && <FormInputItem>
          {getFieldDecorator('percent', {
            initialValue: containers,
            rules: [],
          })(
            <Percent {...{ containers: containers }} />
          )}
        </FormInputItem>} */}
      </Form>
    )
  }
}

export default AddAppForm;