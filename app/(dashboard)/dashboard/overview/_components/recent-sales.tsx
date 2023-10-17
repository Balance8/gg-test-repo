import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentGifts() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>AM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Arthas Menethil</p>
          <p className="text-sm text-muted-foreground">
            arthas.menethil@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+1,999.00 GP</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/avatars/02.png" alt="Avatar" />
          <AvatarFallback>MC</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Master Chief</p>
          <p className="text-sm text-muted-foreground">
            master.chief@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+39.00 GP</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/03.png" alt="Avatar" />
          <AvatarFallback>GV</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Guthix Vortex</p>
          <p className="text-sm text-muted-foreground">
            guthix.vortex@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+299.00 GP</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/04.png" alt="Avatar" />
          <AvatarFallback>TS</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Illidan Stormrage</p>
          <p className="text-sm text-muted-foreground">
            illidan.stormrage@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+99.00 GP</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/05.png" alt="Avatar" />
          <AvatarFallback>CB</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Cortana Blue</p>
          <p className="text-sm text-muted-foreground">
            cortana.blue@email.com
          </p>
        </div>
        <div className="ml-auto font-medium">+39.00 GP</div>
      </div>
    </div>
  )
}
