// @flow
type EventHandlers = {
  (onMouseMove): (MouseEvent) => void,
  (onWindowResize): (Event) => void
};

type MountedInstance = {
  component: React$Element<*>,
  handlers: Object
};

let mountedInstances: MountedInstance[] = []

const handleMouseMove = e => {
  mountedInstances.forEach((instance: MountedInstance) => {
    instance.handlers.onMouseMove(e)
  })
}

const handleWindowResize = e => {
  mountedInstances.forEach((instance: MountedInstance) => {
    instance.handlers.onWindowResize(e)
  })
}

export const registerHandlers = (
  component: React$Element<*>,
  handlers: EventHandlers
): void => {
  if (!mountedInstances.length) {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleWindowResize)
  }

  mountedInstances.push({ component, handlers })
}

export const unregisterHandlers = (component: React$Element<*>): void => {
  mountedInstances = mountedInstances.filter((instance: MountedInstance): boolean => {
    return instance.component !== component
  })
  if (!mountedInstances.length) {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', handleWindowResize)
  }
}
