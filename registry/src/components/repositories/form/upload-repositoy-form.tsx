import { PureComponent } from 'react';
import { Form, Radio } from 'antd';
import FileInput, { FileInputProps } from './input/file-input';
import InternalInput, { InternalInputProps } from './input/internal-input';
import ExternalInput, { ExternalInputProps } from './input/external-input';
import styles from './style/index.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export interface UploadRepositoyFormProps extends FileInputProps, InternalInputProps, ExternalInputProps { }

class AddProjectForm extends PureComponent<UploadRepositoyFormProps, any> {
  state = {
    type: "file"
  }
  render() {
    const { admin, namespace, username, searchProjects } = this.props;
    const { type } = this.state;
    return (
      <Form className={styles.ekos_upload_image} id="upload">
        <FormItem style={{ marginBottom: 16 }} >
          <RadioGroup value={type} onChange={(e) => this.setState({ type: e.target.value })}>
            <RadioButton value="file">文件上传</RadioButton>
            <RadioButton value="internal">集群内部上传</RadioButton>
            <RadioButton value="external">集群外部上传</RadioButton>
          </RadioGroup>
        </FormItem>
        {type === 'file' ? (
          <FileInput admin={admin} namespace={namespace} searchProjects={searchProjects} />
        ) : type === 'internal' ? (
          <InternalInput username={username} />
        ) : (
              <ExternalInput username={username} />
            )}
      </Form>
    )
  }
}

export default AddProjectForm;