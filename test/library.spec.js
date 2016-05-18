import chai from 'chai';
import angular from 'angular';
import 'joddet';
import 'marked';
import 'codemirror';

import angularJotted from '../lib/angular-jotted.js';

chai.expect();

const expect = chai.expect;

var lib;

describe('Given an instance of my library', function () {
  before(function () {
    lib = new angularJotted();
  });
  describe('when I need the name', function () {
    it('should return the name', () => {
      expect(lib).to.be.equal('angular-jotted');
    });
  });
});