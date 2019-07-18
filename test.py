import os
import unittest
from appium import webdriver


class AppiumTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Remote(
            command_executor='http://127.0.0.1:4723/wd/hub',
            desired_capabilities=OPTIONS)

    def tearDown(self):
        self.driver.quit()

    def repl(self):
        import pdb; pdb.set_trace()

def _get(self, text, index=None, partial=False):
        ''' get RIGHT NOW, fail if it's not there '''
        selector = options['xpath_selector']
        if text.startswith('#'):
            elements = self.driver.find_elements_by_accessibility_id(text[1:])
        elif partial:
            elements = self.driver.find_elements_by_xpath('//*[contains(@%s, "%s")]' % (selector, text))
        else:
            elements = self.driver.find_elements_by_xpath('//*[@%s="%s"]' % (selector, text))
        if not elements:
            raise Exception()
        if index:
            return elements[index]
        if index is None and len(elements) > 1:
            raise IndexError('More that one element found for %r' % text)
        return elements[0]

    def get(self, text, *args, **kwargs):
        ''' try to get for X seconds; paper over loading waits/sleeps '''
        timeout_seconds = kwargs.get('timeout_seconds', 10)
        start = time.time()
        while time.time() - start < timeout_seconds:
            try:
                return self._get(text, *args, **kwargs)
            except IndexError:
                raise
            except:
                pass
            self.wait(.2)
        raise Exception('Could not find text %r after %r seconds' % (
            text, timeout_seconds))

    def wait_until(self, *args, **kwargs):
        # only care if there is at least one match
        return self.get(*args, index=0, **kwargs)