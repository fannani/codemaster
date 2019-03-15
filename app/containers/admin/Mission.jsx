import React from 'react';

const Mission = () => {
  return <div>Test</div>;
  // return <div>
  //
  //   <ul className="list-group">
  //     {function() {
  //       const render = [];
  //       let { testcaseCount } = this.state;
  //       for (let i = 0; i <= testcaseCount; i++) {
  //         render.push(
  //           <li className="list-group-item">
  //             <div className="form-group">
  //               <label>Testcase {i}</label>
  //               <input
  //                 key={i}
  //                 className="form-control"
  //                 type="text"
  //                 onChange={event => {
  //                   event.persist();
  //                   const testcase = values.testcase.slice();
  //                   testcase[i] = event.target.value;
  //                   setFieldValue('testcase', testcase);
  //                 }}
  //               />
  //             </div>
  //           </li>,
  //         );
  //       }
  //       return render;
  //     }.bind(this)()}
  //   </ul>
  //   <button
  //     type="button"
  //     style={{'marginTop' : '10px'}}
  //     className="btn"
  //     onClick={function() {
  //       let { testcaseCount } = this.state;
  //       testcaseCount += 1;
  //       this.setState({
  //         testcaseCount,
  //       });
  //     }.bind(this)}
  //   >
  //     Add Testcase
  //   </button>
  // </div>;
};

export default Mission;
