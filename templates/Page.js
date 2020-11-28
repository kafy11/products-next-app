import PageHead from './PageHead';
import PageFooter from './PageFooter';

//Basic Page template with a title, a toolbar and a footer
const Page = ({ title, children, toolbarContent }) => (
  <>
    <PageHead title={title}/>
    <div className="container py-5">
      <div className="row">
        <div className="col-auto">
          <h3 className="page__title">{title}</h3>
        </div>
        <div className="col page__toolbar">
          {toolbarContent}
        </div>
      </div>
      
      <div className="page__content">
        {children}
      </div>

      <PageFooter />
    </div>
  </>
);

export default Page;