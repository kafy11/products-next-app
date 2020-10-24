import PageHead from './PageHead';
import PageFooter from './PageFooter';

const Page = ({ title, children, toolbarContent }) => (
  <>
    <PageHead title={title}/>
    <div className="container py-5">
      <div className="row">
        <div className="col-auto">
          <h3>{title}</h3>
        </div>
        <div className="col">
          {toolbarContent}
        </div>
      </div>
      
      {children}

      <PageFooter />
    </div>
  </>
);

export default Page;