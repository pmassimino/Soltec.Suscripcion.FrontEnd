
import { ErrorItem } from '@/utils/errors';
type Props = 
{
    errorList:ErrorItem[];
}
function ErrorList({ errorList }:Props) {
    return (
      <div>
        <ul>
          {errorList.map(item => (
            <li key={item.key}>{item.message}</li>
          ))}
        </ul>
      </div>
    );
  }
  export default ErrorList;