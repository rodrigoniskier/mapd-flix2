import json,re,sys
from PIL import Image
import numpy as np
OUT='test-results/contraste'
def lin(c):
    c=c/255.0; return np.where(c<=0.03928,c/12.92,((c+0.055)/1.055)**2.4)
def lum(rgb): r,g,b=lin(rgb[...,0]),lin(rgb[...,1]),lin(rgb[...,2]); return 0.2126*r+0.7152*g+0.0722*b
def parse(c):
    m=re.findall(r'[\d.]+',c); v=[float(x) for x in m]; a=v[3] if len(v)>3 else 1
    if c.startswith('color(srgb'): v=[x*255 for x in v[:3]]+[a]
    if c.startswith('oklab'):
        import re as _r
        nums=[float(x) for x in _r.findall(r'-?[\d.]+(?:e-?\d+)?',c)]
        L,A,B=nums[:3]; a=nums[3] if len(nums)>3 else 1
        l_=L+0.3963377774*A+0.2158037573*B; m_=L-0.1055613458*A-0.0638541728*B; s_=L-0.0894841775*A-1.2914855480*B
        l,m,s=l_**3,m_**3,s_**3
        lr=[4.0767416621*l-3.3077115913*m+0.2309699292*s,-1.2684380046*l+2.6097574011*m-0.3413193965*s,-0.0041960863*l-0.7034186147*m+1.7076147010*s]
        f=lambda x: 12.92*x if x<=0.0031308 else 1.055*x**(1/2.4)-0.055
        v=[max(0,min(1,f(x)))*255 for x in lr]
    return np.array(v[:3]),a
data=json.load(open(f'{OUT}/items.json'))
fails={}
for shot in data:
    bg=np.asarray(Image.open(f"{OUT}/{shot['id']}-bg.png").convert('RGB')).astype(float)
    H,W,_=bg.shape
    for it in shot['items']:
        x0,y0,x1,y1=[int(round(v)) for v in it['box']]
        reg=bg[max(0,y0):min(H,y1),max(0,x0):min(W,x1)].reshape(-1,3)
        if len(reg)==0: continue
        col,a=parse(it['color']); a*=it['op']
        L=lum(reg)
        Lt=None
        # cor efetiva do texto sobre fundo mediano
        med=np.median(reg,axis=0)
        eff=col*a+med*(1-a)
        lt=float(lum(eff[None,:])[0])
        light= lt>float(np.median(L))
        worst=np.percentile(L,92) if light else np.percentile(L,8)
        hi,lo=max(lt,worst),min(lt,worst); cr=(hi+0.05)/(lo+0.05)
        large= it['fs']>=24 or (it['fs']>=18.66 and it['fw']>=700)
        need=3.0 if large else 4.5
        if cr<need:
            k=(shot['id'].split('-',1)[1].rsplit('-',1)[0], it['t'][:40], it['cls'][:70])
            prev=fails.get(k)
            if not prev or cr<prev[0]: fails[k]=(round(cr,2),need,shot['id'],it['color'],round(it['fs']),it['tag'])
for k,v in sorted(fails.items(),key=lambda x:x[1][0]):
    print(f"{v[0]:5} <{v[1]} {v[2]:22} {k[1]!r:44} {v[5]} fs{v[4]} {v[3]} | {k[2]}")
print(len(fails),'falhas')
