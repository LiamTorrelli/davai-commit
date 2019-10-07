// Libs
import path from 'path'
import shell from 'shelljs'

export const PREVIEWING = {
  // TODO - ING
  // const previewBaseAction = `c:/"Program Files (x86)"/Tencent/微信web开发者工具/cli.bat --preview ${directory}`
  /**
   * Getting current git branch @return {String || false}
   */
  async generatePreview({
    DEV_TOOLS_PATH,
    directory,
    pagePath,
    pageQueryParams
  }) {
    const resolvedDevtoolsPath = path.resolve(DEV_TOOLS_PATH).split('\'').join('"')

    const { code: quitCode } = shell.exec(
      `${resolvedDevtoolsPath} --close ${path.resolve(directory)}`,
      { async: false }
    )

    if (quitCode !== 0) throw new Error('Quitting devtools failed')

    function sleep(ms) {
      return new Promise(resolve => {
        setTimeout(resolve, ms)
      })
    }
    // 3 seconds is the time, when wechat prompts a user to quit. 1 second is just to be safe
    await sleep(4000)

    const previewBaseAction = `${resolvedDevtoolsPath} --preview ${path.resolve(directory)}`
    const pathToPreviewOutput = `${path.resolve(directory, 'DAVAI-INFO/preview-info-output.json')}`
    const pathToBase64File = `${path.resolve(directory, 'DAVAI-INFO/preview-base-64.txt')}`
    const pathToFutureImg = `${path.resolve(directory, 'DAVAI-INFO/QR.jpeg')}`
    const outputQrInfo = `base64@${pathToBase64File}`
    const compileCondition = `--compile-condition '{"pathName":"${pagePath}","query":"${pageQueryParams}"}'`
    const developerInfoPath = `${path.resolve(directory, 'DAVAI-INFO/preview-params.json')}`

    const output = shell.exec(
      `${previewBaseAction} --preview-info-output ${pathToPreviewOutput} --preview-qr-output ${outputQrInfo} ${compileCondition}`,
      { async: false }
    )

    const { stdout, stderr, code } = output

    return {
      ErrorMessage: stderr || null,
      result: stdout,
      code,
      pathToBase64File,
      pathToFutureImg,
      developerInfoPath,
      pathToPreviewOutput
    }
  }

}
