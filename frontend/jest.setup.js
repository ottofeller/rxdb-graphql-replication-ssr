import Adapter from 'enzyme-adapter-react-16'
import {configure} from 'enzyme'
import fetch from 'jest-fetch-mock'
jest.setMock('node-fetch', fetch)
configure({adapter: new Adapter()})
