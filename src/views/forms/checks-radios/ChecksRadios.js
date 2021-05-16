import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormCheck, CRow } from '@coreui/react'
import { DocsLink, Example } from 'src/reusable'

const ChecksRadios = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Checkbox</strong>
          </CCardHeader>
          <CCardBody>
            <Example href="https://coreui.io/react/docs/4.0/forms/checks-radios">
              <CFormCheck id="flexCheckDefault" label="Default checkbox" />
              <CFormCheck id="flexCheckChecked" label="Checked checkbox" defaultChecked />
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Checkbox</strong> <small>Disabled</small>
          </CCardHeader>
          <CCardBody>
            <p class="text-medium-emphasis small">
              Add the <code class="css-0">disabled</code> attribute and the associated{' '}
              <code class="css-0">&lt;label&gt;</code>s are automatically styled to match with a
              lighter color to help indicate the input's state.
            </p>
            <Example href="https://coreui.io/react/docs/4.0/forms/checks-radios#disabled">
              <CFormCheck label="Disabled checkbox" disabled />
              <CFormCheck label="Disabled checked checkbox" defaultChecked disabled />
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Radio</strong>
          </CCardHeader>
          <CCardBody>
            <p class="text-medium-emphasis small">
              Add the <code class="css-0">disabled</code> attribute and the associated{' '}
              <code class="css-0">&lt;label&gt;</code>s are automatically styled to match with a
              lighter color to help indicate the input's state.
            </p>
            <Example href="https://coreui.io/react/docs/4.0/forms/checks-radios#radios">
              <CFormCheck
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                label="Default radio"
              />
              <CFormCheck
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                label="Checked radio"
                defaultChecked
              />
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Radio</strong> <small>Disabled</small>
          </CCardHeader>
          <CCardBody>
            <Example href="https://coreui.io/react/docs/4.0/forms/checks-radios#disabled-1">
              <CFormCheck
                type="radio"
                name="flexRadioDisabled"
                id="flexRadioDisabled"
                label="Disabled radio"
                disabled
              />
              <CFormCheck
                type="radio"
                name="flexRadioDisabled"
                id="flexRadioCheckedDisabled"
                label="Disabled checked radio"
                defaultChecked
                disabled
              />
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Switches</strong>
          </CCardHeader>
          <CCardBody>
            <p class="text-medium-emphasis small">
              A switch has the markup of a custom checkbox but uses the{' '}
              <code class="css-0">switch</code> boolean properly to render a toggle switch. Switches
              also support the <code class="css-0">disabled</code> attribute.
            </p>
            <Example href="https://coreui.io/react/docs/4.0/forms/checks-radios#switches">
              <CFormCheck
                switch
                label="Default switch checkbox input"
                id="formSwitchCheckDefault"
              />
              <CFormCheck
                switch
                label="Checked switch checkbox input"
                id="formSwitchCheckChecked"
                defaultChecked
              />
              <CFormCheck
                switch
                label="Disabled switch checkbox input"
                id="formSwitchCheckDisabled"
                disabled
              />
              <CFormCheck
                switch
                label="Disabled checked switch checkbox input"
                id="formSwitchCheckCheckedDisabled"
                defaultChecked
                disabled
              />
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Switches</strong> <small>Sizes</small>
          </CCardHeader>
          <CCardBody>
            <Example href="https://coreui.io/react/docs/4.0/forms/checks-radios#sizes">
              <CFormCheck
                switch
                label="Default switch checkbox input"
                id="formSwitchCheckDefault"
              />
              <CFormCheck
                switch
                size="lg"
                label="Large switch checkbox input"
                id="formSwitchCheckDefaultLg"
              />
              <CFormCheck
                switch
                size="xl"
                label="Extra large switch checkbox input"
                id="formSwitchCheckDefaultXL"
              />
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Checks and Radios</strong> <small>Default layout (stacked)</small>
          </CCardHeader>
          <CCardBody>
            <p class="text-medium-emphasis small">
              By default, any number of checkboxes and radios that are immediate sibling will be
              vertically stacked and appropriately spaced.
            </p>
            <Example href="https://coreui.io/react/docs/4.0/forms/checks-radios#default-stacked">
              <CFormCheck id="defaultCheck1" label="Default checkbox" />
              <CFormCheck id="defaultCheck2" label="Disabled checkbox" disabled />
            </Example>
            <Example href="https://coreui.io/react/docs/4.0/forms/checks-radios#default-stacked">
              <CFormCheck
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="option1"
                label="Default radio"
                defaultChecked
              />
              <CFormCheck
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value="option2"
                label="Second default radio"
              />
              <CFormCheck
                type="radio"
                name="exampleRadios"
                id="exampleRadios3"
                value="option3"
                label="Disabled radio"
                disabled
              />
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Checks and Radios</strong> <small>Inline</small>
          </CCardHeader>
          <CCardBody>
            <p class="text-medium-emphasis small">
              Group checkboxes or radios on the same horizontal row by adding{' '}
              <code class="css-0">inline</code> boolean property to any{' '}
              <code class="css-0">&lt;CFormCheck&gt;</code>.
            </p>
            <Example href="https://coreui.io/react/docs/4.0/forms/checks-radios#inline">
              <CFormCheck inline id="inlineCheckbox1" value="option1" label="1" />
              <CFormCheck inline id="inlineCheckbox2" value="option2" label="2" />
              <CFormCheck
                inline
                id="inlineCheckbox3"
                value="option3"
                label="3 (disabled)"
                disabled
              />
            </Example>
            <Example href="https://coreui.io/react/docs/4.0/forms/checks-radios#inline">
              <CFormCheck
                inline
                type="radio"
                name="inlineRadioOptions"
                id="inlineCheckbox1"
                value="option1"
                label="1"
              />
              <CFormCheck
                inline
                type="radio"
                name="inlineRadioOptions"
                id="inlineCheckbox2"
                value="option2"
                label="2"
              />
              <CFormCheck
                inline
                type="radio"
                name="inlineRadioOptions"
                id="inlineCheckbox3"
                value="option3"
                label="3 (disabled)"
                disabled
              />
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Checks and Radios</strong> <small>Without labels</small>
          </CCardHeader>
          <CCardBody>
            <p class="text-medium-emphasis small">
              Remember to still provide some form of accessible name for assistive technologies (for
              instance, using <code class="css-0">aria-label</code>).
            </p>
            <Example href="https://coreui.io/react/docs/4.0/forms/checks-radios#without-labels">
              <div>
                <CFormCheck id="checkboxNoLabel" value="" aria-label="..." />
              </div>
              <div>
                <CFormCheck
                  type="radio"
                  name="radioNoLabel"
                  id="radioNoLabel"
                  value=""
                  aria-label="..."
                />
              </div>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Toggle buttons</strong>
          </CCardHeader>
          <CCardBody>
            <p class="text-medium-emphasis small">
              Create button-like checkboxes and radio buttons by using{' '}
              <code class="css-0">button</code> boolean property on the{' '}
              <code class="css-0">&lt;CFormCheck&gt;</code> component. These toggle buttons can
              further be grouped in a button group if needed.
            </p>
            <Example href="https://coreui.io/react/docs/4.0/forms/checks-radios#toggle-buttons">
              <CFormCheck button id="btn-check" autocomplete="off" label="Single toggle" />
            </Example>
            <Example href="https://coreui.io/react/docs/4.0/forms/checks-radios#toggle-buttons">
              <CFormCheck
                button
                id="btn-check-2"
                autocomplete="off"
                label="Checked"
                defaultChecked
              />
            </Example>
            <Example href="https://coreui.io/react/docs/4.0/forms/checks-radios#toggle-buttons">
              <CFormCheck button id="btn-check-3" autocomplete="off" label="Disabled" disabled />
            </Example>
            <h3>Radio toggle buttons</h3>
            <Example href="https://coreui.io/react/docs/4.0/forms/checks-radios#toggle-buttons">
              <CFormCheck
                button
                buttonColor="secondary"
                type="radio"
                name="options"
                id="option1"
                autocomplete="off"
                label="Checked"
                defaultChecked
              />
              <CFormCheck
                button
                buttonColor="secondary"
                type="radio"
                name="options"
                id="option2"
                autocomplete="off"
                label="Radio"
              />
              <CFormCheck
                button
                buttonColor="secondary"
                type="radio"
                name="options"
                id="option3"
                autocomplete="off"
                label="Radio"
                disabled
              />
              <CFormCheck
                button
                buttonColor="secondary"
                type="radio"
                name="options"
                id="option4"
                autocomplete="off"
                label="Radio"
              />
            </Example>
            <h3>Outlined styles</h3>
            <p class="css-0">
              Different variants of button, such at the various outlined styles, are supported.
            </p>
            <Example href="https://coreui.io/react/docs/4.0/forms/checks-radios#toggle-buttons">
              <div>
                <CFormCheck
                  button
                  buttonColor="primary"
                  buttonVariant="outline"
                  id="btn-check-outlined"
                  autocomplete="off"
                  label="Single toggle"
                />
              </div>
              <div>
                <CFormCheck
                  button
                  buttonColor="secondary"
                  buttonVariant="outline"
                  id="btn-check-2-outlined"
                  autocomplete="off"
                  label="Checked"
                  defaultChecked
                />
              </div>
              <div>
                <CFormCheck
                  button
                  buttonColor="success"
                  buttonVariant="outline"
                  type="radio"
                  name="options-outlined"
                  id="success-outlined"
                  autocomplete="off"
                  label="Radio"
                  defaultChecked
                />
                <CFormCheck
                  button
                  buttonColor="danger"
                  buttonVariant="outline"
                  type="radio"
                  name="options-outlined"
                  id="danger-outlined"
                  autocomplete="off"
                  label="Radio"
                />
              </div>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ChecksRadios